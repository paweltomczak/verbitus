import Image from 'next/image';
import { Post } from '../lib/interfaces';
import { extractFirstParagraph } from '../lib/utils';
import Link from 'next/link';

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
      <div className='w-full mb-8 px-4'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='relative w-full md:w-1/2 h-[300px] overflow-hidden'>
            <Link href={`/post/${post.id}`}>
              <Image
                src={post.image_url}
                alt={post.title}
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
                priority={isFeatured}
              />
            </Link>
          </div>
          <div className='p-4 md:px-8 md:pt-8 w-full md:w-1/2'>
            <div className='text-sm uppercase text-gray-500'>
              {post.category}
            </div>
            <Link href={`/post/${post.id}`}>
              <h2 className='font-[900] text-3xl md:text-5xl my-4 tracking-tighter hover:text-hover'>
                {post.title}
              </h2>
            </Link>
            <p className='text-gray-700'>{firstParagraph}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='w-full md:w-1/2 mb-8 px-4'>
        <div className='flex flex-col items-center'>
          <div className='relative w-full h-[250px] overflow-hidden'>
            <Link href={`/post/${post.id}`}>
              <Image
                src={post.image_url}
                alt={post.title}
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
                priority={isFeatured}
              />
            </Link>
          </div>
          <div className='px-4 pt-4'>
            <div className='text-sm uppercase text-gray-500'>
              {post.category}
            </div>
            <Link href={`/post/${post.id}`}>
              <h2 className='font-bold text-xl md:text-2xl my-4 tracking-tighter hover:text-hover'>
                {post.title}
              </h2>
            </Link>
            <p className='text-gray-700'>{firstParagraph}</p>
          </div>
        </div>
      </div>
    );
  }
}
