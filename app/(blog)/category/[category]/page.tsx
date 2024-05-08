import { fetchCatPostsPages } from '@/app/lib/data';
import { urlToString } from '@/app/lib/utils';
import { CategoryAndTagsPostsSkeleton } from '@/app/ui/common/loaders';
import { CategoryPosts } from '@/app/ui/posts/CategoryPosts';
import { Pagination } from '@/app/ui/posts/Pagination';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

type PageProps = {
  params: {
    category: string;
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
  const { category } = params;

  const parentTitle = (await parent).title?.absolute || '';
  const parentDescription = (await parent).description || '';
  const parentKeywords = (await parent).keywords || [];
  const stringCat = urlToString(category);

  return {
    title: {
      absolute: `${stringCat} - ${parentTitle}`,
    },
    description: `${stringCat} - ${parentDescription}`,
    keywords: [stringCat, ...parentKeywords],
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const { category } = params;

  const catName = category.replace(/(^|\s)\S/g, (letter) =>
    letter.toUpperCase()
  );

  const totalPages = await fetchCatPostsPages(query, catName);
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense
        key={query + category}
        fallback={<CategoryAndTagsPostsSkeleton />}
      >
        <CategoryPosts
          query={query}
          category={category}
          currentPage={currentPage}
        />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </>
  );
}
