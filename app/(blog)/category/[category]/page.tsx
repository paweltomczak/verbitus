import { fetchPostsByCategory } from '@/app/lib/data';
import { Post } from '@/app/lib/interfaces';
import { urlToCategory } from '@/app/lib/utils';
import BlogPost from '@/app/ui/posts/BlogPost';

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const catString = urlToCategory(category);
  const posts = (await fetchPostsByCategory(catString)) as Post[];

  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6 flex flex-wrap'>
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  );
}
