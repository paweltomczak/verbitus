import Header from '@/app/ui/Header';
import { fetchCategories, fetchPosts } from '../lib/data';
import BlogPost from '../ui/BlogPost';
import { Post } from '../lib/interfaces';

export async function generateStaticParams() {
  const posts = await fetchPosts();

  return posts.map((post) => ({
    slug: 'fdsafsa',
  }));
}

export default async function Home() {
  const posts = (await fetchPosts()) as Post[];

  console.log(posts);

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap'>
      {posts.map((post, index) => (
        <BlogPost key={post.id} post={post} isFeatured={index === 0} />
      ))}
    </div>
  );
}
