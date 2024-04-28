import { Post } from '@/app/lib/interfaces';
import { NoPostsFound } from '../common/NoPostsFound';
import BlogPost from './BlogPost';
import { fetchPostsByTagsAndSearch } from '@/app/lib/data';

export const TagPosts = async ({
  query,
  tag,
}: {
  query: string;
  tag: string;
}) => {
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
};
