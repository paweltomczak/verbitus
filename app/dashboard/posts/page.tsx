import { fetchPosts } from '@/app/lib/actions';
import { DeletePost, EditPost } from '@/app/ui/dashboard/posts/buttons';
import Image from 'next/image';

export default async function Page() {
  const posts = await fetchPosts();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}.${date.getFullYear()}`;
  };

  return (
    <div className='flex flex-col divide-y divide-gray-200'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='flex flex-wrap items-center md:flex-nowrap p-4 bg-white shadow-md rounded-lg m-2'
        >
          <div className='flex-1 p-2 text-center'>{post.title}</div>
          <div className='flex-1 p-2 text-sm text-gray-600'>
            {post.content.length > 100
              ? `${post.content.slice(0, 100)}...`
              : post.content}
          </div>
          <div className='flex-1 p-2 text-sm text-center'>
            {formatDate(post.createdAt)}
          </div>
          <div className='flex-1 p-2 flex justify-center items-center'>
            <Image
              src={post.imageURL}
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
      ))}
    </div>
  );
}
