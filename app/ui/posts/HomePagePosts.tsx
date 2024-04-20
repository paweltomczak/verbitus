import { fetchPosts } from '@/app/lib/data';
import { Post } from '@/app/lib/interfaces';
import BlogPost from '../BlogPost';

export const HomePagePosts = async () => {
  const posts = (await fetchPosts()) as Post[];

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap'>
      {posts.map((post, index) => (
        <BlogPost key={post.id} post={post} isFeatured={index === 0} />
      ))}
    </div>
  );
};
