import { Spinner } from '@/app/ui/common/loaders';
import { HomePagePosts } from '@/app/ui/posts/HomePagePosts';
import { PostDetails } from '@/app/ui/posts/PostDetails';
import { Suspense } from 'react';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default function Page({ params, searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const { slug } = params;

  return query.length === 0 ? (
    <Suspense fallback={<Spinner />}>
      <PostDetails slug={slug} />
    </Suspense>
  ) : (
    <Suspense fallback={<Spinner />}>
      <HomePagePosts query={query} />
    </Suspense>
  );
}
