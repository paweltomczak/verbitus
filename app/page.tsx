import Header from '@/app/ui/Header';
import { fetchCategories, fetchPosts } from './lib/data';
import BlogPost from './ui/BlogPost';
import { Post } from './lib/interfaces';

export default async function Home() {
  const categories = await fetchCategories();
  const posts = (await fetchPosts()) as Post[];

  return (
    <>
      <Header categories={categories} />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <div>
          {posts.length > 0 && <BlogPost post={posts[0]} isFeatured={true} />}
          <div className='flex flex-wrap mt-10'>
            {posts.slice(1).map((post) => (
              <BlogPost key={post.id} post={post} isFeatured={false} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
