import { CreatePost } from '@/app/ui/dashboard/posts/CreatePost';
import { Spinner } from '@/app/ui/loaders';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <CreatePost />
    </Suspense>
  );
}
