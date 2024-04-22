import { fetchPostsByCategoryAndSearch } from '@/app/lib/data';
import { Post } from '@/app/lib/interfaces';
import { urlToCategory } from '@/app/lib/utils';
import { NoPostsFound } from '@/app/ui/common/NoPostsFound';
import BlogPost from '@/app/ui/posts/BlogPost';

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const { category } = params;
  const catString = urlToCategory(category);
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
