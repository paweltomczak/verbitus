import { fetchPostById, fetchPostsPages, getIdFromSlug } from '@/app/lib/data';
import { extractFirstParagraph } from '@/app/lib/utils';
import {
  PostDetailsSkeleton,
  PostSearchSkeletons,
} from '@/app/ui/common/loaders';
import { HomePagePosts } from '@/app/ui/posts/HomePagePosts';
import { Pagination } from '@/app/ui/posts/Pagination';
import { PostDetails } from '@/app/ui/posts/PostDetails';
import { Metadata, ResolvingMetadata } from 'next';
import Script from 'next/script';
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
    const title = post.title;
    const description = query.length === 0 ? firstParagraph : parentDescription;

    return {
      title: {
        absolute: title,
      },
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
        title: title,
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

  return (
    <>
      {query.length === 0 ? (
        <Suspense fallback={<PostDetailsSkeleton />}>
          <PostDetails slug={slug} />
        </Suspense>
      ) : (
        <>
          <Suspense
            key={query + currentPage}
            fallback={<PostSearchSkeletons />}
          >
            <HomePagePosts query={query} currentPage={currentPage} />
          </Suspense>
          <Pagination totalPages={totalPages} />
        </>
      )}
      <div id='fb-root'></div>
      <Script
        defer
        crossOrigin='anonymous'
        src='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0'
        nonce='IPpdCVyX'
      />
    </>
  );
}
