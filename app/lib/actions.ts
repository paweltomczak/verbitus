'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, storage, db } from '@/app/lib/firebase/config';
import admin from '@/app/lib/firebase/admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from 'firebase/storage';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import { Post } from './interfaces';

export async function SignUpUser(
  state: { message: any; type: string } | undefined,
  formData: FormData
): Promise<{ message: any; type: string }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      isAdmin: false,
    });

    return {
      uid: userRecord.uid,
      email: userRecord.email,
      message: 'User created successfully',
      type: 'success',
    } as { uid: string; email: string; message: any; type: string };
  } catch (error: any) {
    switch (error.code) {
      case 'auth/invalid-credential':
        return {
          message: 'Your credentials are invalid. Please check and try again.',
          type: 'error',
        };

      case 'auth/user-not-found':
        return {
          message: 'No user found with this information.',
          type: 'error',
        };

      default:
        return {
          message: error.message,
          type: 'error',
        };
    }
  }
}

export async function SignInUser(
  state: { message: any; type: string } | undefined,
  formData: FormData
): Promise<{ message: any; type: string }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await userCredential.user.getIdToken();
    const userId = userCredential.user.uid;

    const verificationResult = await verifyUserToken({ token });

    if (verificationResult) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await admin.auth().createSessionCookie(token, {
        expiresIn,
      });
      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      await admin.auth().setCustomUserClaims(userId, { isAdmin: true });

      cookies().set(options);
    }
  } catch (error: any) {
    switch (error.code) {
      case 'auth/invalid-credential':
        return {
          message: 'Your credentials are invalid. Please check and try again.',
          type: 'error',
        };

      case 'auth/user-not-found':
        return {
          message: 'No user found with this information.',
          type: 'error',
        };

      default:
        return {
          message: error.message,
          type: 'error',
        };
    }
  }
  revalidatePath('/signin');
  redirect('/dashboard');
}

export async function verifyUserToken({ token }: { token: string }) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const userDoc = await admin.firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      throw new Error('User does not exist');
    }

    if (!userDoc?.data()?.isAdmin) {
      throw new Error('You need to be Admin to access the dashboard');
    }

    const authUser = await admin.auth().getUser(uid);

    return {
      uid: authUser.uid,
      email: authUser.email,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUser() {
  try {
    const sessionCookie = cookies().get('session')?.value;
    if (!sessionCookie) return null;

    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    const userRecord = await admin.auth().getUser(uid);

    return {
      uid: userRecord.uid,
      email: userRecord.email,
    };
  } catch (error) {
    return null;
  }
}

export async function signOut() {
  try {
    const sessionCookie = cookies().get('session')?.value;
    if (!sessionCookie) return null;

    await admin.auth().verifySessionCookie(sessionCookie, true);

    cookies().set({
      name: 'session',
      value: '',
      maxAge: 0,
      httpOnly: true,
      secure: true,
    });

    auth.signOut();

    revalidatePath('/signin');
    redirect('/signin');
  } catch (error: any) {
    return {
      message: error.message,
      type: 'error',
    };
  }
}

export async function createPost(
  state: { message: any; type: string } | undefined,
  formData: FormData
): Promise<{ message: any; type: string }> {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const file = formData.get('image');

  if (title === '' || content === '' || file === null) {
    return {
      message: 'Please fill in all fields',
      type: 'error',
    };
  }

  try {
    let imageURL = '';

    if (file instanceof File) {
      imageURL = await uploadImageToStorage(file);
    }

    await admin.firestore().collection('posts').add({
      title,
      content,
      imageURL,
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/dashboard/posts');

    return {
      message: 'Post created successfully',
      type: 'success',
    };
  } catch (error) {
    console.error('Error creating post:', error);
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
      type: 'error',
    };
  }
}

async function uploadImageToStorage(file: File): Promise<string> {
  const filePath = `posts/${new Date().toISOString()}-${file.name}`;
  const newImageRef = ref(storage, filePath);

  const uploadTaskSnapshot = await uploadBytesResumable(newImageRef, file);
  return await getDownloadURL(uploadTaskSnapshot.ref);
}

export async function fetchPosts(): Promise<Post[]> {
  const postsCollectionRef = collection(db, 'posts');
  const q = query(postsCollectionRef);
  const querySnapshot = await getDocs(q);
  const posts: Post[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    content: doc.data().content,
    imageURL: doc.data().imageURL,
    createdAt: doc.data().createdAt,
  }));

  return posts;
}

export async function deletePost(postId: string) {
  try {
    const postDocRef = doc(db, 'posts', postId);
    const postDoc = await getDoc(postDocRef);

    if (!postDoc.exists()) {
      return { message: 'Post not found', type: 'error' };
    }

    const post = postDoc.data();
    const imageURL = post.imageURL;

    if (imageURL) {
      const decodedPath = decodeURIComponent(new URL(imageURL).pathname);
      const storagePath = `${decodedPath.split('/o/')[1]}`;
      const imageRef = ref(storage, storagePath);
      await deleteObject(imageRef);
    }

    await deleteDoc(postDocRef);

    revalidatePath('/dashboard/posts');
  } catch (error) {
    console.error('Error deleting post:', error);
    return {
      message:
        error instanceof Error
          ? error.message
          : 'An error occurred during post deletion',
      type: 'error',
    };
  }
}
