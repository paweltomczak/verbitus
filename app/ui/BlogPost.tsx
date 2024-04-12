import Image from 'next/image';
import { Post } from '../lib/interfaces';
import { extractFirstParagraph } from '../lib/utils';

export default function BlogPost({
  post,
  isFeatured,
}: {
  post: Post;
  isFeatured: boolean;
}) {
  const firstParagraph = extractFirstParagraph(post.content);
  if (isFeatured) {
    return (
      <div className='flex flex-col md:flex-row w-full px-7 md:py-7'>
        <div className='relative w-full md:w-1/2 h-64 md:h-[300px]'>
          <Image
            src={post.image_url}
            alt={post.title}
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          />
        </div>
        <div className='flex flex-col justify-between md:px-8 md:pt-0 pt-8 w-full md:w-1/2'>
          <div>
            <div className='text-sm uppercase text-gray-500'>
              {post.category}
            </div>
            <h2 className='font-[900] md:text-5xl text-2xl my-4 tracking-tighter'>
              {post.title}
            </h2>
            <p className='text-gray-700'>{firstParagraph}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col md:w-1/2 px-7 mb-4'>
        <div className='w-full h-64 relative'>
          <Image
            src={post.image_url}
            alt={post.title}
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
          />
        </div>
        <div className='md:py-7 py-7'>
          <div className='text-sm uppercase text-gray-500'>{post.category}</div>
          <h2 className='font-[900] text-2xl my-4 tracking-tighter'>
            {post.title}
          </h2>
          <p>{firstParagraph}</p>
        </div>
      </div>
    );
  }
}
