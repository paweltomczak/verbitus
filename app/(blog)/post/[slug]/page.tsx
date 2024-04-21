import { Spinner } from '@/app/ui/common/loaders';
import { PostDetails } from '@/app/ui/posts/PostDetails';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <Suspense fallback={<Spinner />}>
      <PostDetails slug={slug} />
    </Suspense>
  );
}
