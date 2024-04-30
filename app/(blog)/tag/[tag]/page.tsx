import { urlToString } from '@/app/lib/utils';
import { CategoryAndTagsPostsSkeleton } from '@/app/ui/common/loaders';
import { TagPosts } from '@/app/ui/posts/TagPosts';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

type PageProps = {
  params: {
    tag: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { tag } = params;

  const parentTitle = (await parent).title?.absolute || '';
  const parentDescription = (await parent).description || '';
  const parentKeywords = (await parent).keywords || [];
  const stringTag = urlToString(tag);

  return {
    title: {
      absolute: `${stringTag} - ${parentTitle}`,
    },
    description: `${stringTag} - ${parentDescription}`,
    keywords: [stringTag, ...parentKeywords],
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const { tag } = params;

  return (
    <>
      <Suspense key={query + tag} fallback={<CategoryAndTagsPostsSkeleton />}>
        <TagPosts query={query} tag={tag} />
      </Suspense>
    </>
  );
}
