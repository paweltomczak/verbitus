import {
  fetchPostById,
  fetchPostViewsAndLikes,
  getIdFromSlug,
} from '@/app/lib/data';
import { readingTime, stringToURL } from '@/app/lib/utils';
import { CalendarDaysIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TwitterShareButton } from './TwitterShareButton';
import { FacebookShareButton } from './FacebookShareButton';
import { ViewsAndLikes } from './ViewsAndLikes';

export const PostDetails = async ({ slug }: { slug: string }) => {
  const id = getIdFromSlug(slug);
  const siteURL = process.env.SITE_URL;

  if (id === undefined) notFound();

  try {
    const post = await fetchPostById(id);
    const postViewsAndLikes = await fetchPostViewsAndLikes(id);
    const minutesRead = readingTime(post.content);

    return (
      <div className='w-full'>
        <h1 className='md:leading-tight tracking-tighter md:max-w-3xl md:mx-auto text-3xl md:text-5xl text-center font-bold m-10'>
          {post.title}
        </h1>
        <span className='flex justify-between max-w-3xl lg:px-0 px-6 mx-auto text-sm font-light text-gray-400 pb-8'>
          <div className='flex gap-2 items-center'>
            <CalendarDaysIcon className='w-5 h-5 -mt-[2px]' />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className='flex gap-2 items-center'>
            <BookOpenIcon className='w-5 h-5' />
            {minutesRead} {minutesRead === 1 ? 'minute' : 'minutes'} read
          </div>
        </span>
        <div className='relative max-w-3xl m-auto h-[200px] md:h-[400px]'>
          <Image
            src={post.image_url}
            alt={post.title}
            fill={true}
            className='md:pb-5 object-cover'
            priority
          />
        </div>
        <div className='max-w-3xl mx-auto lg:px-0 px-6 text-left my-6 font-light'>
          <div
            className='leading-relaxed content'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <ViewsAndLikes
            postId={id}
            viewCount={postViewsAndLikes.viewCount}
            likesCount={postViewsAndLikes.likesCount}
          />
          <div className='py-5 mt-5 flex justify-between items-start gap-4'>
            <div className='md:w-2/3'>
              {post.tags.map((tag, index) => (
                <Link
                  href={`/tag/${stringToURL(tag)}`}
                  key={index}
                  className='inline-block bg-primary dark:bg-darkSkeleton text-body text-sm font-semibold mr-3 mb-3 px-5 py-2 rounded-full hover:bg-hover dark:hover:bg-hover'
                >
                  {tag}
                </Link>
              ))}
            </div>
            <TwitterShareButton hashtags={post.tags} />
            <FacebookShareButton siteURL={siteURL} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};
