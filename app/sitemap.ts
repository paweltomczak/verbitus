import { MetadataRoute } from 'next';
import {
  fetchAllPostsForSitemap,
  fetchCategories,
  fetchTags,
  getPostSlug,
} from './lib/data';
import { Post } from './lib/interfaces';
import { stringToURL } from './lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await fetchAllPostsForSitemap()) as Post[];
  const tags = await fetchTags();
  const categories = await fetchCategories();

  const postEntries = await Promise.all(
    posts.map(async (post) => {
      const postURL = getPostSlug(post);

      return {
        url: `${process.env.SITE_URL}/post/${postURL}`,
        lastModified: post.updated_at,
      };
    })
  );

  const tagsEntries = await Promise.all(
    tags.map(async ({ name }) => {
      const tagURL = stringToURL(name);

      return {
        url: `${process.env.SITE_URL}/tag/${tagURL}`,
      };
    })
  );

  const catEntries = await Promise.all(
    categories.map(async ({ name }) => {
      const catURL = stringToURL(name);

      return {
        url: `${process.env.SITE_URL}/category/${catURL}`,
      };
    })
  );

  return [
    ...postEntries,
    ...tagsEntries,
    ...catEntries,
    { url: `${process.env.SITE_URL}/privacy` },
  ];
}
