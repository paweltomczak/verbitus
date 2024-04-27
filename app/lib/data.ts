import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { Post } from './interfaces';

const ITEMS_PER_PAGE = 5;

export async function fetchPosts(query?: string, currentPage?: number) {
  noStore();

  const offset = currentPage && (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    if (query) {
      const { rows } = await sql`
        SELECT * FROM posts
        WHERE title ILIKE ${'%' + query + '%'} OR content ILIKE ${
        '%' + query + '%'
      }
        ORDER BY created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return rows;
    } else {
      const { rows } = await sql`
        SELECT * FROM posts
        ORDER BY created_at DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
      return rows;
    }
  } catch (error) {
    throw new Error('Failed to fetch posts.');
  }
}

export async function fetchPostsPages(query: string) {
  noStore();

  try {
    const { rows } = await sql`
    SELECT COUNT(*) FROM posts
    WHERE title ILIKE ${'%' + query + '%'} OR content ILIKE ${'%' + query + '%'}
  `;
    const totalPages = Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
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

export async function fetchPostsByCategoryAndSearch(
  category: string,
  searchQuery?: string
) {
  try {
    const searchPattern = `%${searchQuery}%`;
    const { rows } =
      await sql`SELECT * FROM posts WHERE category = ${category} AND (title LIKE ${searchPattern} OR content LIKE ${searchPattern}) ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    throw new Error(
      `Failed to fetch posts for the category ${category} with search query ${searchQuery}.`
    );
  }
}

export async function fetchPostsByTagsAndSearch(
  tag: string,
  searchQuery: string = ''
) {
  try {
    const searchPattern = `%${searchQuery}%`;
    const normalizedTag = tag.toLowerCase().replace(/[\s\-]/g, '');

    const { rows } = await sql`
      SELECT * FROM posts
      WHERE EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(tags) AS t(tag)
        WHERE lower(regexp_replace(regexp_replace(t.tag, '[-\\s]', '', 'g'), '[^\\w]', '', 'g')) = ${normalizedTag}
      )
      AND (title LIKE ${searchPattern} OR content LIKE ${searchPattern})
      ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    throw new Error(
      `Failed to fetch posts with tag '${tag}' and search query '${searchQuery}'.`
    );
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
