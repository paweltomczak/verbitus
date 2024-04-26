import { fetchPostById, getIdFromSlug } from '@/app/lib/data';
import { stringToURL } from '@/app/lib/utils';
import {
  CalendarDaysIcon,
  CalendarIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const PostDetails = async ({ slug }: { slug: string }) => {
  const id = getIdFromSlug(slug);

  if (id === undefined) notFound();

  try {
    const post = await fetchPostById(id);

    return (
      <div className='w-full'>
        <h1 className='text-3xl md:text-5xl text-center font-bold m-10'>
          {post.title}
        </h1>
        <span className='flex items-center justify-center text-sm gap-2 font-light text-gray-400 pb-8'>
          <CalendarDaysIcon className='w-5 h-5 -mt-[2px]' />
          {new Date(post.created_at).toLocaleDateString()}
        </span>
        <div className='relative w-full h-[200px] md:h-[400px]'>
          <Image
            src={post.image_url}
            alt={post.title}
            fill={true}
            className='md:pb-5 object-cover'
          />
        </div>
        <div className='max-w-4xl mx-auto px-4 text-left my-6 font-light'>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className='py-5 mt-5'>
            <span className='flex items-center font-light gap-1 mb-4'>
              <TagIcon className='w-5 h-5' />
              Tags:
            </span>
            {post.tags.map((tag, index) => (
              <Link
                href={`/tag/${stringToURL(tag)}`}
                key={index}
                className='inline-block bg-primary dark:bg-body dark:text-primary text-body text-sm font-semibold mr-3 mb-3 px-5 py-2 rounded-full hover:bg-hover dark:hover:bg-hover'
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};
