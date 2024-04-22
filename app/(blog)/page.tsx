import { Spinner } from '@/app/ui/common/loaders';
import { Suspense } from 'react';
import { HomePagePosts } from '../ui/posts/HomePagePosts';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <Suspense fallback={<Spinner />}>
      <HomePagePosts query={query} />
    </Suspense>
  );
}
