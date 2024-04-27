import { fetchPosts } from '@/app/lib/data';
import { Post } from '@/app/lib/interfaces';
import BlogPost from './BlogPost';
import { NoPostsFound } from '../common/NoPostsFound';

export const HomePagePosts = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const posts = (await fetchPosts(query, currentPage)) as Post[];

  if (posts.length === 0) {
    return <NoPostsFound />;
  }

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap'>
      {posts.map((post, index) => (
        <BlogPost
          key={post.id}
          post={post}
          isFeatured={index === 0}
          query={query}
        />
      ))}
    </div>
  );
};
