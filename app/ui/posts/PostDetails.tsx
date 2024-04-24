import { fetchPostById, getIdFromSlug } from '@/app/lib/data';
import { stringToURL } from '@/app/lib/utils';
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
        <h1 className='text-3xl md:text-5xl text-center font-bold md:m-10 py-8'>
          {post.title}
        </h1>
        <div className='relative w-full h-[300px] md:h-[500px]'>
          <Image
            src={post.image_url}
            alt={post.title}
            fill={true}
            className='md:pb-5 object-cover'
          />
        </div>
        <div className='max-w-4xl mx-auto px-4 text-center my-6'>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className='p-5 mt-5'>
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
