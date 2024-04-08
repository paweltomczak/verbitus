import { fetchPosts } from '@/app/lib/data';
import { removeHTMLTags } from '@/app/lib/utils';
import { DeletePost, EditPost } from '@/app/ui/dashboard/buttons';
import Image from 'next/image';

export default async function Posts() {
  const posts = await fetchPosts();

  return (
    <div>
      <div className='flex flex-wrap md:flex-nowrap bg-primary text-body p-4 shadow-md rounded-t-lg m-2'>
        <div className='flex-1 p-2 text-center font-bold'>Title</div>
        <div className='flex-1 p-2 text-center font-bold'>Content</div>
        <div className='flex-1 p-2 text-center font-bold'>Date</div>
        <div className='flex-1 p-2 text-center font-bold'>Tags</div>
        <div className='flex-1 p-2 text-center font-bold'>Image</div>
        <div className='hidden flex-1 p-2 text-center font-bold md:block'></div>
      </div>
      {posts.map((post) => (
        <div
          key={post.id}
          className='flex flex-wrap items-center md:flex-nowrap p-4 bg-white shadow-md rounded-lg m-2'
        >
          <div className='flex-1 p-2 text-center'>{post.title}</div>
          <div className='flex-1 p-2 text-gray-600 text-center'>
            {removeHTMLTags(post.content.slice(0, 100))}
          </div>
          <div className='flex-1 p-2 text-center'>
            {post.created_at.toLocaleDateString()}
          </div>
          <div className='flex-1 p-2 text-center'>{post.tags?.join(', ')}</div>
          <div className='flex-1 p-2 flex justify-center items-center'>
            <Image
              src={post.image_url}
              alt='Post image'
              width={64}
              height={64}
              className='rounded'
            />
          </div>
          <div className='w-full flex sm:flex-1 p-2 justify-center items-center gap-2'>
            <div className='w-full sm:w-auto'>
              <EditPost id={post.id} />
            </div>
            <div className='w-full sm:w-auto'>
              <DeletePost id={post.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
