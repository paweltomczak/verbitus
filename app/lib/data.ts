import { sql } from '@vercel/postgres';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';
import { Post } from './interfaces';

const ITEMS_PER_PAGE = 5;

export const fetchPosts = cache(
  async (query?: string, currentPage?: number) => {
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
  },
  ['fetch-posts'],
  { tags: ['posts'], revalidate: false }
);

export const fetchAllPostsForSitemap = async () => {
  noStore();

  try {
    const { rows } = await sql`
      SELECT * FROM posts
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    throw new Error('Failed to fetch posts.');
  }
};

export const fetchPostsPages = cache(
  async (query: string) => {
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
  },
  ['fetch-posts-pages'],
  { tags: ['posts'], revalidate: false }
);

export const fetchPostById = cache(
  async (id: string) => {
    try {
      const { rows } = await sql<Post>`SELECT * from posts WHERE id=${id}`;

      return rows[0];
    } catch (error) {
      throw new Error('Failed to fetch post.');
    }
  },
  ['fetch-post-by-id'],
  { tags: ['postId'], revalidate: false }
);

export const fetchPostsByCategoryAndSearch = cache(
  async (category: string, searchQuery?: string) => {
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
  },
  ['fetch-posts-by-cat-and-search'],
  { tags: ['posts'], revalidate: false }
);

export const fetchPostsByTagsAndSearch = cache(
  async (tag: string, searchQuery: string = '') => {
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
  },
  ['fetch-posts-by-tags-and-search'],
  { tags: ['posts'], revalidate: false }
);

export const fetchTags = cache(
  async (): Promise<{ id: number; name: string }[]> => {
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
  },
  ['fetch-tags'],
  { tags: ['tags'], revalidate: false }
);

export const fetchCategories = cache(
  async (): Promise<{ id: number; name: string }[]> => {
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
  },
  ['fetch-categories'],
  { tags: ['categories'], revalidate: false }
);

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
