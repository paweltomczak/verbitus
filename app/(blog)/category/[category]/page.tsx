import { fetchPostsByCategoryAndSearch } from '@/app/lib/data';
import { Post } from '@/app/lib/interfaces';
import { urlToString } from '@/app/lib/utils';
import { NoPostsFound } from '@/app/ui/common/NoPostsFound';
import BlogPost from '@/app/ui/posts/BlogPost';
import { Metadata, ResolvingMetadata } from 'next';

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
    title: `${stringCat} - ${parentTitle}`,
    description: `${stringCat} - ${parentDescription}`,
    keywords: [stringCat, ...parentKeywords],
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const { category } = params;
  const catString = urlToString(category);
  const posts = (await fetchPostsByCategoryAndSearch(
    catString,
    query
  )) as Post[];

  if (posts.length === 0) {
    return <NoPostsFound />;
  }

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6 flex flex-wrap'>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} query={query} />
      ))}
    </div>
  );
}
