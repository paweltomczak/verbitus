'use client';

import { getPostSlug } from '@/app/lib/data';
import { TopPost } from '@/app/lib/interfaces';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const PostCarousel = ({
  posts,
  type,
}: {
  posts: TopPost[];
  type: 'views' | 'likes';
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  return (
    <div className='w-full sm:w-1/2 p-5'>
      <h2 className='text-center font-[900] text-2xl md:text-3xl mb-8 tracking-tighter'>
        Most {type === 'views' ? 'viewed' : 'liked'}
      </h2>
      <div className='overflow-hidden relative'>
        <div
          className='flex transition-transform duration-300 text-center'
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {posts.map((post, index) => (
            <div className='flex-shrink-0 w-full' key={post.id}>
              <div className='flex flex-col'>
                <div className='relative w-full overflow-hidden'>
                  <Link href={`/post/${getPostSlug(post)}`}>
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      width={550}
                      height={250}
                      className='w-full max-h-[250px] h-auto rounded object-cover transition-transform duration-300 ease-in-out hover:scale-105'
                    />
                  </Link>
                  <div className='absolute bottom-0 left-0 bg-body dark:bg-primary dark:text-body p-3 text-lg font-bold rounded-tr-2xl'>
                    {index + 1}
                  </div>
                </div>
                <div className='px-4 pt-4'>
                  {type === 'views' && (
                    <div className='flex gap-2 items-center text-sm justify-center py-1'>
                      <EyeIcon className='w-5 h-5' />
                      {post.view_count} views
                    </div>
                  )}
                  {type === 'likes' && (
                    <div className='flex gap-2 items-center text-sm justify-center py-1'>
                      <HeartIcon className='w-5 h-5' />
                      {post.likes_count}{' '}
                      {post.likes_count === 1 ? 'like' : 'likes'}
                    </div>
                  )}
                  <Link href={`/post/${getPostSlug(post)}`}>
                    <h2 className='font-bold text-xl md:text-2xl my-4 tracking-tighter hover:text-hover'>
                      {post.title}
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center gap-10 mt-2'>
          <button
            onClick={prevSlide}
            className='w-9 h-9 hover:bg-hover dark:hover:bg-hover hover:text-body bg-primary dark:bg-body text-body dark:text-primary rounded-full flex items-center justify-center'
          >
            <ChevronLeftIcon className='h-6 w-6 -ml-2 pl-2' />
          </button>
          <button
            onClick={nextSlide}
            className='w-9 h-9 hover:bg-hover dark:hover:bg-hover hover:text-body bg-primary dark:bg-body text-body dark:text-primary rounded-full flex items-center justify-center'
          >
            <ChevronRightIcon className='h-6 w-6 -mr-2 pr-2' />
          </button>
        </div>
      </div>
    </div>
  );
};
