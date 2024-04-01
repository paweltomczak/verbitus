'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/config';
import admin from '@/app/lib/firebase/admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

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
        SameSite: 'Strict',
      };

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
