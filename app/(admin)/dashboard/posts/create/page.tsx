import { CreatePost } from '@/app/ui/dashboard/posts/CreatePost';
import { Spinner } from '@/app/ui/common/loaders';
import { Suspense } from 'react';

export const maxDuration = 20;

export default async function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <CreatePost />
    </Suspense>
  );
}
