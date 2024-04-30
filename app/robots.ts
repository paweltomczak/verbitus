import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/signin', '/signup'],
      },
    ],
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  };
}
