import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Post } from './interfaces';

export async function fetchPosts() {
  noStore();

  try {
    const { rows } = await sql`SELECT * from posts ORDER BY created_at DESC`;

    return rows;
  } catch (error) {
    throw new Error('Failed to fetch posts.');
  }
}

export async function fetchPostById(id: string) {
  noStore();

  try {
    const { rows } = await sql<Post>`SELECT * from posts WHERE id=${id}`;

    return rows[0];
  } catch (error) {
    throw new Error('Failed to fetch post.');
  }
}

export async function fetchTags(): Promise<{ id: number; name: string }[]> {
  noStore();

  try {
    const result = await sql`SELECT * FROM tags;`;
    return result.rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name),
    }));
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export async function fetchCategories(): Promise<
  { id: number; name: string }[]
> {
  noStore();

  try {
    const result = await sql`SELECT * FROM categories;`;
    return result.rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name),
    }));
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

const titleToSlug = (title: string) => {
  const uriSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return encodeURI(uriSlug);
};

export const getPostSlug = (post: Post) => {
  return `${titleToSlug(post.title)}-${post.id}`;
};

export const getIdFromSlug = (slug: string) => slug.split('-').pop();
