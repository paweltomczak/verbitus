import { fetchPosts } from '@/app/lib/data';
import { removeHTMLTags } from '@/app/lib/utils';
import { DeletePost, EditPost } from '@/app/ui/dashboard/buttons';
import Image from 'next/image';

export default async function Posts() {
  const posts = await fetchPosts();

  return posts.map((post) => (
    <div
      key={post.id}
      className='flex flex-wrap items-center md:flex-nowrap p-4 bg-white shadow-md rounded-lg m-2'
    >
      <div className='flex-1 p-2 text-center'>{post.title}</div>
      <div className='flex-1 p-2 text-gray-600'>
        {removeHTMLTags(post.content.slice(0, 100))}
      </div>
      <div className='flex-1 p-2 text-center'>
        {post.created_at.toLocaleDateString()}
      </div>
      <div className='flex-1 p-2 flex justify-center items-center'>
        <Image
          src={post.image_url}
          alt='Post image'
          width={64}
          height={64}
          className='rounded'
        />
      </div>
      <div className='flex-1 p-2 flex justify-end items-center gap-2'>
        <EditPost id={post.id} />
        <DeletePost id={post.id} />
      </div>
    </div>
  ));
}
