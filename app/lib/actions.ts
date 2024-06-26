'use server';

import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { sql } from '@vercel/postgres';
import bcryptjs from 'bcryptjs';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';
import { openai } from './openAI';
import { DataForAI, State } from './interfaces';
import { sanitizeInput } from './sanitize';

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
    const fileRef = ref(storage, `posts/${file.name}`);
    await uploadBytes(fileRef, file);
    const imageUrl = await getDownloadURL(fileRef);

    await sql`
      INSERT INTO posts (title, content, image_url, tags, category)
      VALUES (${title}, ${content}, ${imageUrl}, ${JSON.stringify(
      tags
    )}, ${category})
      RETURNING *;
    `;

    revalidateTag('posts');
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

      const fileRef = ref(storage, `posts/${file.name}`);
      await uploadBytes(fileRef, file);
      imageUrl = await getDownloadURL(fileRef);
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

    revalidateTag('postId');
    revalidateTag('posts');
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
    const image = await sql`
      SELECT image_url FROM posts WHERE id = ${postId};
    `;
    const imageUrl = image.rows[0].image_url;

    const fileRef = ref(storage, imageUrl);
    await deleteObject(fileRef);

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

    revalidateTag('posts');
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

  if (!tag) {
    return {
      message: 'Please enter a tag',
      type: 'error',
    };
  }

  try {
    const existingTag = await sql`SELECT name FROM tags WHERE name = ${tag}`;

    if (existingTag.rowCount > 0) {
      return {
        message: 'A tag with this name already exists.',
        type: 'error',
      };
    }

    await sql`INSERT INTO tags (name) VALUES (${tag})`;

    revalidateTag('tags');
    revalidatePath('/dashboard/tags');
    revalidatePath('/dashboard/posts/create');
    revalidatePath('/dashboard/posts/[id]/edit', 'page');

    return {
      message: 'Tag created successfully',
      type: 'success',
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.error('Error creating tag:', error);
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

    revalidateTag('tags');
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
    const result =
      await sql`SELECT name FROM categories WHERE name = ${category}`;

    if (result.rowCount > 0) {
      return {
        message: 'A category with this name already exists.',
        type: 'error',
      };
    }

    await sql`INSERT INTO categories (name) VALUES (${category})`;

    revalidateTag('categories');
    revalidatePath('/dashboard/categories');
    revalidatePath('/dashboard/posts/create');
    revalidatePath('/dashboard/posts/[id]/edit', 'page');

    return {
      message: 'Category created successfully',
      type: 'success',
      resetKey: Date.now().toString(),
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

    revalidateTag('categories');
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

export const viewsIncrement = async (postId: string) => {
  try {
    await sql`UPDATE posts SET view_count = view_count + 1 WHERE id = ${postId} RETURNING view_count`;
    revalidateTag('postViewsAndLikes');
  } catch (error) {
    console.log(error);
  }
};

export const toggleLikesCount = async (
  postId: string,
  shouldIncrement: boolean
) => {
  try {
    const incrementValue = shouldIncrement ? 1 : -1;

    const { rows } = await sql`
      UPDATE posts
      SET likes_count = likes_count + ${incrementValue}
      WHERE id = ${postId}
      RETURNING likes_count
    `;

    revalidateTag('postViewsAndLikes');

    return rows[0].likes_count;
  } catch (error) {
    console.log(error);
  }
};

export const generateAIpost = async (dataForAI: DataForAI) => {
  const prompt = `
  Create a unique, detailed blog post with the following structure:
  {
    "title": "Post title",
    "content": "Blog post content",
    "tags": ["tag1", "tag2"],
    "category": "Post category"
  }
  Requirements:
  Unique article different from: ${dataForAI.titles}
  Pick up to 5 tags from: ${dataForAI.tags}
  Use one of these categories: ${dataForAI.categories}
  SEO friendly with high CPC Google Adsense keywords wrapped in <strong> tags
  HTML structured content (<p> for paragraphs, <h2> for headings)
  Title as a string only
  Each heading in <p><br></p><h2>Header</h2><p><br></p>, first paragraph without heading
  Comprehensive and engaging with the longest content possible
  `;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    const messageContent = chatCompletion.choices[0].message.content;
    if (messageContent) {
      return {
        message: 'AI generated Post created',
        type: 'success',
        content: JSON.parse(messageContent),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'Something went wrong. Try again.',
      type: 'error',
      content: null,
    };
  }
};

export async function addCommentToPost(
  postId: string,
  prevState: State,
  formData: FormData
) {
  const name = formData.get('name') as string;
  const comment = formData.get('comment') as string;

  if (!name || !comment) {
    return {
      message: 'Please fill in all fields',
      type: 'error',
    };
  }

  const sanitizedName = sanitizeInput(name);
  const sanitizedComment = sanitizeInput(comment);

  if (!sanitizedName || !sanitizedComment) {
    return {
      message: 'Invalid comment!',
      type: 'error',
    };
  }

  try {
    const query = `INSERT INTO comments (post_id, name, comment, date) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const parameters = [
      postId,
      sanitizedName,
      sanitizedComment,
      new Date().toISOString(),
    ];

    await sql.query(query, parameters);

    revalidateTag('comments');

    return {
      message: 'Comment added successfully',
      type: 'success',
      resetKey: Date.now().toString(),
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: 'Failed to add comment. Please try again.',
      type: 'error',
    };
  }
}
