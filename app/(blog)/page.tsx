import { Spinner } from '@/app/ui/loaders';
import { Suspense } from 'react';
import { HomePagePosts } from '../ui/posts/HomePagePosts';

export default async function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomePagePosts />
    </Suspense>
  );
}
