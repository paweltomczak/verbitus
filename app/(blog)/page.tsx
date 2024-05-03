import { HomePageSkeletons } from '@/app/ui/common/loaders';
import { Suspense } from 'react';
import { HomePagePosts } from '../ui/posts/HomePagePosts';
import { Metadata, ResolvingMetadata } from 'next';
import { fetchPostsPages, fetchTopPosts } from '../lib/data';
import { Pagination } from '../ui/posts/Pagination';
import { PostCarousel } from '../ui/posts/PostsCarousel';

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
    title: query.length === 0 ? previousTitle : `${query} - Search results`,
  };
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPostsPages(query);
  const topPosts = await fetchTopPosts();

  return (
    <>
      <Suspense key={query + currentPage} fallback={<HomePageSkeletons />}>
        <HomePagePosts query={query} currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPages} />
      <div className='max-w-7xl justify-center items-center flex flex-col sm:flex-row lg:p-10 mx-auto'>
        <PostCarousel posts={topPosts.viewed} type='views' />
        <PostCarousel posts={topPosts.liked} type='likes' />
      </div>
    </>
  );
}
