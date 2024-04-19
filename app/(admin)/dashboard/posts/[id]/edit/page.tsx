import { EditPost } from '@/app/ui/dashboard/posts/EditPost';
import { Spinner } from '@/app/ui/loaders';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <Suspense fallback={<Spinner />}>
      <EditPost id={id} />
    </Suspense>
  );
}
