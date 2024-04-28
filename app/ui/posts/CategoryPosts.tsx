import { Post } from '@/app/lib/interfaces';
import { NoPostsFound } from '../common/NoPostsFound';
import BlogPost from './BlogPost';
import { fetchPostsByCategoryAndSearch } from '@/app/lib/data';
import { urlToString } from '@/app/lib/utils';

export const CategoryPosts = async ({
  query,
  category,
}: {
  query: string;
  category: string;
}) => {
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
};
