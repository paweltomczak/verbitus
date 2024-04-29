import Posts from '@/app/ui/dashboard/posts/Posts';
import { Spinner } from '@/app/ui/common/loaders';
import { Suspense } from 'react';
import { Pagination } from '@/app/ui/posts/Pagination';
import { fetchPosts, fetchPostsPages } from '@/app/lib/data';
import { Post } from '@/app/lib/interfaces';

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostsPages(query);
  const posts = (await fetchPosts(query, currentPage)) as Post[];

  return (
    <div className='flex flex-col w-full'>
      <Suspense fallback={<Spinner />}>
        <Posts posts={posts} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
