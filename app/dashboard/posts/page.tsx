import Posts from '@/app/ui/dashboard/posts/Posts';
import { Spinner } from '@/app/ui/loaders';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <div className='flex flex-col'>
      <Suspense fallback={<Spinner />}>
        <Posts />
      </Suspense>
    </div>
  );
}
