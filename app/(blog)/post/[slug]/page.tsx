import { fetchPostById, fetchPostsPages, getIdFromSlug } from '@/app/lib/data';
import { extractFirstParagraph } from '@/app/lib/utils';
import { Spinner } from '@/app/ui/common/loaders';
import { HomePagePosts } from '@/app/ui/posts/HomePagePosts';
import { Pagination } from '@/app/ui/posts/Pagination';
import { PostDetails } from '@/app/ui/posts/PostDetails';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

type PageProps = {
  params: {
    slug: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = searchParams?.query || '';
  const { slug } = params;
  const id = getIdFromSlug(slug);

  const parentTitle = (await parent).title || '';
  const parentDescription = (await parent).description || '';
  const parentKeywords = (await parent).keywords || [];

  if (id) {
    const post = await fetchPostById(id);
    const firstParagraph = extractFirstParagraph(post.content);
    const title = query.length === 0 ? post.title : `${query} - Search results`;
    const description = query.length === 0 ? firstParagraph : parentDescription;

    return {
      title: title,
      description: description,
      keywords: query.length === 0 ? post.tags : parentKeywords,
      openGraph: {
        title: title,
        description: description,
        type: 'article',
        publishedTime: post.created_at,
        images: post.image_url,
      },
      twitter: {
        card: 'summary_large_image',
        images: post.image_url,
        title: `${title} | Verbitus`,
      },
    };
  } else {
    return {
      title: parentTitle,
      description: parentDescription,
      keywords: parentKeywords,
    };
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { slug } = params;

  const totalPages = await fetchPostsPages(query);

  return query.length === 0 ? (
    <Suspense fallback={<Spinner />}>
      <PostDetails slug={slug} />
    </Suspense>
  ) : (
    <>
      <Suspense key={query + currentPage} fallback={<Spinner />}>
        <HomePagePosts query={query} currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </>
  );
}
