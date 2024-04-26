import { Spinner } from '@/app/ui/common/loaders';
import { Suspense } from 'react';
import { HomePagePosts } from '../ui/posts/HomePagePosts';
import { Metadata, ResolvedMetadata, ResolvingMetadata } from 'next';

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const query = searchParams?.query || '';
  const previousTitle = (await parent).title || '';
  return {
    title:
      query.length === 0
        ? previousTitle
        : `${query} - Search results | Verbitus`,
  };
}

export default async function Page({ searchParams }: Props) {
  const query = searchParams?.query || '';

  return (
    <Suspense fallback={<Spinner />}>
      <HomePagePosts query={query} />
    </Suspense>
  );
}
