import { AddTags } from '@/app/ui/dashboard/tags/AddTags';
import { Spinner } from '@/app/ui/common/loaders';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <AddTags />
    </Suspense>
  );
}
