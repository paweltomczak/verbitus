import { MetadataRoute } from 'next';
import { fetchAllForSitemap, getPostSlug } from './lib/data';
import { stringToURL } from './lib/utils';
import { Post } from './lib/interfaces';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await fetchAllForSitemap();

  const sitemapEntries = await Promise.all(
    entries.map(async (entry) => {
      let url = `${process.env.SITE_URL}/`;
      switch (entry.type) {
        case 'post':
          const postURL = getPostSlug({
            title: entry.name,
            id: entry.id,
          } as Post);
          console.log(entry);
          url += `post/${postURL}`;
          return { url, lastModified: entry.updated_at };
        case 'tag':
          url += `tag/${stringToURL(entry.name)}`;
          return { url };
        case 'category':
          url += `category/${stringToURL(entry.name)}`;
          return { url };
        default:
          return undefined;
      }
    })
  );

  const validEntries = sitemapEntries.filter((entry) => entry !== undefined);

  validEntries.push({ url: `${process.env.SITE_URL}/privacy` });

  return validEntries as MetadataRoute.Sitemap;
}
