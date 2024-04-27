import Image from 'next/image';
import { Post } from '../../lib/interfaces';
import { extractFirstParagraph } from '../../lib/utils';
import Link from 'next/link';
import { getPostSlug } from '../../lib/data';

export default function BlogPost({
  post,
  isFeatured = false,
  query,
}: {
  post: Post;
  isFeatured?: boolean;
  query: string;
}) {
  const firstParagraph = extractFirstParagraph(post.content);

  const correctSlug = getPostSlug(post);

  if (isFeatured && !query) {
    return (
      <div className='w-full mb-4 sm:mb-12 px-4'>
        <div className='flex flex-col lg:flex-row items-center justify-center'>
          <div className='lg:w-full overflow-hidden'>
            <Link href={`/post/${correctSlug}`}>
              <Image
                src={post.image_url}
                alt={post.title}
                width={600}
                height={350}
                className='rounded object-cover transition-transform duration-300 ease-in-out hover:scale-105'
                priority
              />
            </Link>
          </div>
          <div className='p-4 md:px-8 md:pt-4 w-full'>
            <div className='text-sm uppercase text-gray-500'>
              {post.category}
            </div>
            <Link href={`/post/${correctSlug}`}>
              <h2 className='font-[900] text-3xl md:text-4xl my-4 tracking-tighter hover:text-hover'>
                {post.title}
              </h2>
            </Link>
            <p className='font-light'>{firstParagraph}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='w-full md:w-1/2 mb-8 px-4'>
        <div className='flex flex-col items-center'>
          <div className='relative w-full overflow-hidden'>
            <Link href={`/post/${correctSlug}`}>
              <Image
                src={post.image_url}
                alt={post.title}
                width={550}
                height={250}
                className='max-h-[250px] rounded object-cover transition-transform duration-300 ease-in-out hover:scale-105'
              />
            </Link>
          </div>
          <div className='px-4 pt-4'>
            <div className='text-sm uppercase text-gray-500'>
              {post.category}
            </div>
            <Link href={`/post/${correctSlug}`}>
              <h2 className='font-bold text-xl md:text-2xl my-4 tracking-tighter hover:text-hover'>
                {post.title}
              </h2>
            </Link>
            <p className='font-light'>{firstParagraph}</p>
          </div>
        </div>
      </div>
    );
  }
}
