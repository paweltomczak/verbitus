import { fetchPostsByTagsAndSearch } from '@/app/lib/data';
import { Post } from '@/app/lib/interfaces';
import { urlToString } from '@/app/lib/utils';
import { NoPostsFound } from '@/app/ui/common/NoPostsFound';
import BlogPost from '@/app/ui/posts/BlogPost';
import { Metadata, ResolvingMetadata } from 'next';

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
    title: `${stringTag} - ${parentTitle}`,
    description: `${stringTag} - ${parentDescription}`,
    keywords: [stringTag, ...parentKeywords],
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const query = searchParams?.query || '';
  const { tag } = params;
  const posts = (await fetchPostsByTagsAndSearch(tag, query)) as Post[];

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
