import { sql } from '@vercel/postgres';
import {
  unstable_cache as cache,
  unstable_noStore as noStore,
} from 'next/cache';
import { Post, TopPost } from './interfaces';

const ITEMS_PER_PAGE = 5;
const CAT_ITEMS_PER_PAGE = 4;

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

export const fetchAll = async () => {
  noStore();

  try {
    const postsPromise =
      await sql`SELECT id, title AS name, updated_at, 'post' AS type FROM posts ORDER BY created_at DESC`;
    const tagsPromise =
      await sql`SELECT id, name, 'tag' AS type FROM tags ORDER BY name ASC`;
    const categoriesPromise =
      await sql`SELECT id, name, 'category' AS type FROM categories ORDER BY name ASC`;

    const [posts, tags, categories] = await Promise.all([
      postsPromise,
      tagsPromise,
      categoriesPromise,
    ]);
    return [...posts.rows, ...tags.rows, ...categories.rows];
  } catch (error) {
    console.error(
      'Failed to fetch posts, tags, and categories for sitemap:',
      error
    );
    throw new Error('Failed to fetch posts, tags, and categories.');
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

export const fetchCatPostsPages = cache(
  async (query: string, category: string) => {
    try {
      const { rows } = await sql`
        SELECT COUNT(*) FROM posts
        WHERE (title ILIKE ${'%' + query + '%'} OR content ILIKE ${
        '%' + query + '%'
      })
        AND category = ${category}
      `;

      const totalPages = Math.ceil(Number(rows[0].count) / CAT_ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      throw new Error('Failed to fetch posts.');
    }
  },
  ['fetch-cat-posts-pages'],
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

export const fetchPostViewsAndLikes = cache(
  async (id: string) => {
    try {
      const { rows } =
        await sql`SELECT view_count, likes_count FROM posts WHERE id = ${id}`;
      if (rows.length > 0) {
        return {
          viewCount: rows[0].view_count,
          likesCount: rows[0].likes_count,
        };
      } else {
        console.log('No post found with the given ID:', id);
        return { viewCount: 0, likesCount: 0 };
      }
    } catch (error) {
      console.log('Error fetching counts:', error);
      throw error;
    }
  },
  ['fetch-post-views'],
  { tags: ['postViewsAndLikes'], revalidate: false }
);

export const fetchPostsByCategoryAndSearch = cache(
  async (category: string, searchQuery?: string, currentPage?: number) => {
    const offset = currentPage && (currentPage - 1) * CAT_ITEMS_PER_PAGE;
    try {
      const searchPattern = `%${searchQuery}%`;
      const { rows } = await sql`SELECT * FROM posts
        WHERE category = ${category}
        AND (title LIKE ${searchPattern} OR content LIKE ${searchPattern})
        ORDER BY created_at DESC
        LIMIT ${CAT_ITEMS_PER_PAGE} OFFSET ${offset}`;
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

export const fetchTopPosts = cache(
  async (): Promise<{
    viewed: TopPost[];
    liked: TopPost[];
  }> => {
    noStore();

    try {
      const topViewed =
        await sql`SELECT id, title, view_count, image_url FROM posts ORDER BY view_count DESC LIMIT 5;`;
      const topLiked =
        await sql`SELECT id, title, likes_count, image_url FROM posts ORDER BY likes_count DESC LIMIT 5;`;

      return {
        viewed: topViewed.rows.map((row) => ({
          id: Number(row.id),
          title: String(row.title),
          image_url: String(row.image_url),
          view_count: Number(row.view_count),
        })),
        liked: topLiked.rows.map((row) => ({
          id: Number(row.id),
          title: String(row.title),
          image_url: String(row.image_url),
          likes_count: Number(row.likes_count),
        })),
      };
    } catch (error: any) {
      console.log('Error fetching top posts:', error);
      return { viewed: [], liked: [] };
    }
  },
  ['fetch-top-posts'],
  { tags: ['postViewsAndLikes'], revalidate: false }
);

export const fetchCommentsByPostId = cache(
  async (postId: string) => {
    try {
      const { rows } = await sql`
        SELECT * FROM comments WHERE post_id = ${postId} ORDER BY date DESC;
      `;

      return rows;
    } catch (error) {
      throw new Error('Failed to fetch comments.');
    }
  },
  ['fetch-comments-by-post-id'],
  { tags: ['comments'], revalidate: false }
);

export const fetchRelatedPosts = cache(
  async (postId: string, category: string) => {
    try {
      const { rows } = await sql`
        SELECT id, title, image_url, category
        FROM posts
        WHERE id != ${postId}
        AND category = ${category}
        ORDER BY RANDOM()
        LIMIT 2
      `;

      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch related posts.`);
    }
  },
  ['fetch-related-posts'],
  { tags: ['related-posts'], revalidate: false }
);

const titleToSlug = (title: string) => {
  const uriSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return encodeURI(uriSlug);
};

export const getPostSlug = (post: Post | TopPost) => {
  return `${titleToSlug(post.title)}-${post.id}`;
};

export const getIdFromSlug = (slug: string) => slug.split('-').pop();
