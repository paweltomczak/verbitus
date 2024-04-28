import { HomePageSkeletons, Spinner } from '@/app/ui/common/loaders';
import { Suspense } from 'react';
import { HomePagePosts } from '../ui/posts/HomePagePosts';
import { Metadata, ResolvingMetadata } from 'next';
import { fetchPostsPages } from '../lib/data';
import { Pagination } from '../ui/posts/Pagination';

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = searchParams?.query || '';
  const previousTitle = (await parent).title || '';
  return {
    title:
      query.length === 0
        ? previousTitle
        : `${query} - Search results | Verbitus`,
  };
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPostsPages(query);

  return (
    <>
      <Suspense key={query + currentPage} fallback={<HomePageSkeletons />}>
        <HomePagePosts query={query} currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </>
  );
}
