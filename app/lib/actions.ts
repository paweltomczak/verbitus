'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';
import bcryptjs from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import { put, del } from '@vercel/blob';

export async function SignUpUser(
  state: { message: any; type: string } | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await sql`
      INSERT INTO users (email, password_hash, is_admin)
      VALUES (${email}, ${hashedPassword}, false)
      RETURNING id, email;
    `;

    const userRecord = result.rows[0];

    if (!userRecord) {
      return {
        message: 'Could not create the user. Please try again.',
        type: 'error',
      };
    }

    return {
      message: 'User created successfully',
      type: 'success',
    };
  } catch (error: any) {
    console.error('SignUpUser error:', error);

    if (error.code === '23505' || error.message.includes('users_email_key')) {
      return {
        message: 'This email is already in use. Please use a different email.',
        type: 'error',
      };
    }
    return {
      message: 'Failed to create user. Please try again.',
      type: 'error',
    };
  }
}

export async function SignInUser(
  state: { message: any; type: string } | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Only Admins can access the site.',
            type: 'error',
          };
        default:
          return {
            message: 'An error occurred. Please try again.',
            type: 'error',
          };
      }
    }
  }
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export const SignOutUser = async () => {
  'use server';
  await signOut();
};

export async function createPost(
  state: { message: any; type: string } | undefined,
  formData: FormData
) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const file = formData.get('image') as File;
  const category = formData.get('category') as string;
  const tagsString = formData.get('tags') as string;
  const tags = JSON.parse(tagsString) as string[];

  if (!file?.type.startsWith('image/')) {
    return {
      message: 'Please select an image file',
      type: 'error',
    };
  }

  if (
    title === '' ||
    content === '' ||
    file.size === 0 ||
    tags?.length === 0 ||
    !tags ||
    category === undefined ||
    category === 'null'
  ) {
    return {
      message: 'Please fill in all fields',
      type: 'error',
    };
  }

  try {
    const blob = await put(file.name, file, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
      access: 'public',
    });

    await sql`
      INSERT INTO posts (title, content, image_url, tags, category)
      VALUES (${title}, ${content}, ${blob.url}, ${JSON.stringify(
      tags
    )}, ${category})
      RETURNING *;
    `;

    revalidatePath('/dashboard/posts');

    return {
      message: 'Post created successfully',
      type: 'success',
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Failed to create post. Please try again.',
      type: 'error',
    };
  }
}

export async function updatePost(
  id: string,
  state: { message: any; type: string } | undefined,
  formData: FormData
) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const file = formData.get('image') as File | null;
  const category = formData.get('category') as string;
  const tagsString = formData.get('tags') as string;
  const tags = JSON.parse(tagsString) as string[];
  let imageUrl = formData.get('imageURL') as string | null;

  if (
    title === '' ||
    content === '' ||
    tags?.length === 0 ||
    !tags ||
    category === 'null'
  ) {
    return {
      message: 'Please fill in all fields',
      type: 'error',
    };
  }

  try {
    if (file && file.size > 0) {
      if (!file.type.startsWith('image/')) {
        return {
          message: 'Please select an image file',
          type: 'error',
        };
      }

      const blob = await put(file.name, file, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
        access: 'public',
      });
      imageUrl = blob.url;
    }

    let query;
    let parameters;

    if (imageUrl) {
      query = `UPDATE posts SET title = $1, content = $2, image_url = $3, tags = $4, category = $5 WHERE id = $6 RETURNING *;`;
      parameters = [
        title,
        content,
        imageUrl,
        JSON.stringify(tags),
        category,
        id,
      ];
    } else {
      query = `UPDATE posts SET title = $1, content = $2, tags = $3, category = $4 WHERE id = $5 RETURNING *;`;
      parameters = [title, content, JSON.stringify(tags), category, id];
    }

    await sql.query(query, parameters);

    revalidatePath('/dashboard/posts');

    return {
      message: 'Post updated successfully',
      type: 'success',
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Failed to update post. Please try again.',
      type: 'error',
    };
  }
}

export async function deletePost(postId: number) {
  try {
    const blobUrl = await sql`
      SELECT image_url FROM posts WHERE id = ${postId};
    `;
    const imageUrl = blobUrl.rows[0].image_url;

    if (blobUrl.rows.length) await del(imageUrl);

    const result = await sql`
      DELETE FROM posts
      WHERE id = ${postId}
      RETURNING *;
    `;

    if (!result.rows.length) {
      return {
        message: 'Post not found or already deleted',
        type: 'error',
      };
    }

    revalidatePath('/dashboard/posts');
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Failed to delete post. Please try again.',
      type: 'error',
    };
  }
}

export async function createTag(
  state: { message: any; type: string } | undefined,
  formData: FormData
) {
  const tag = formData.get('tag') as string;

  if (!tag)
    return {
      message: 'Please enter a tag',
      type: 'error',
    };

  try {
    await sql`INSERT INTO tags (name) VALUES (${tag}) ON CONFLICT (name) DO NOTHING;`;

    revalidatePath('/dashboard/tags');
    revalidatePath('/dashboard/posts/create');
    revalidatePath('/dashboard/posts/[id]/edit', 'page');

    return {
      message: 'Tag created successfully',
      type: 'success',
    };
  } catch (error: any) {
    return {
      message: 'Failed to create tag. Please try again.',
      type: 'error',
    };
  }
}

export async function deleteTag(tagId: number) {
  try {
    const result = await sql`
      DELETE FROM tags
      WHERE id = ${tagId}
      RETURNING *;
    `;

    if (!result.rows.length) {
      return {
        message: 'Tag not found or already deleted',
        type: 'error',
      };
    }

    revalidatePath('/dashboard/tags');
    revalidatePath('/dashboard/posts/create');
    revalidatePath('/dashboard/posts/[id]/edit', 'page');

    return {
      message: 'Tag successfully deleted',
      type: 'success',
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Failed to delete tag. Please try again.',
      type: 'error',
    };
  }
}

export async function createCategory(
  state: { message: any; type: string } | undefined,
  formData: FormData
) {
  const category = formData.get('category') as string;

  if (!category)
    return {
      message: 'Please enter a category',
      type: 'error',
    };

  try {
    await sql`INSERT INTO categories (name) VALUES (${category}) ON CONFLICT (name) DO NOTHING;`;

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/posts/create');
    revalidatePath('/dashboard/posts/[id]/edit', 'page');

    return {
      message: 'Category created successfully',
      type: 'success',
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Failed to create Category. Please try again.',
      type: 'error',
    };
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const result = await sql`
      DELETE FROM categories
      WHERE id = ${categoryId}
      RETURNING *;
    `;

    if (!result.rows.length) {
      return {
        message: 'Category not found or already deleted',
        type: 'error',
      };
    }

    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/posts/create');
    revalidatePath('/dashboard/posts/[id]/edit', 'page');

    return {
      message: 'Category successfully deleted',
      type: 'success',
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Failed to delete Category. Please try again.',
      type: 'error',
    };
  }
}
