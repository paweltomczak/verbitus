import { AddCategory } from '@/app/ui/dashboard/categories/AddCategory';
import { Spinner } from '@/app/ui/common/loaders';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <AddCategory />
    </Suspense>
  );
}
