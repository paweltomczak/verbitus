import { fetchPostById, getIdFromSlug } from '@/app/lib/data';
import Image from 'next/image';
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
            layout='fill'
            objectFit='cover'
            className='md:pb-10'
          />
        </div>
        <div className='max-w-4xl mx-auto px-4 text-center mt-6'>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};
