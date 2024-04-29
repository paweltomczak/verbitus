'use client';

import type { Posts } from '@/app/lib/interfaces';
import { removeHTMLTags } from '@/app/lib/utils';
import { DeletePost, EditPost } from '@/app/ui/dashboard/buttons';
import Image from 'next/image';
import { Search } from '../../layout/Search';
import { useState } from 'react';
import { NoPostsFound } from '../../common/NoPostsFound';

export default function Posts({ posts }: Posts) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className='md:px-10 pt-10'>
      <div className='flex justify-end overflow-hidden mr-5 mb-5 h-10'>
        <Search
          handleIconClick={() => setShowInput(!showInput)}
          showInput={showInput}
        />
      </div>
      <div className='flex flex-wrap md:flex-nowrap bg-primary text-body p-4 shadow-md rounded-t-lg m-2'>
        <div className='flex-1 p-2 text-center font-bold'>Title</div>
        <div className='flex-1 p-2 text-center font-bold'>Content</div>
        <div className='flex-1 p-2 text-center font-bold'>Date</div>
        <div className='flex-1 p-2 text-center font-bold'>Category</div>
        <div className='flex-1 p-2 text-center font-bold'>Image</div>
        <div className='hidden flex-1 p-2 text-center font-bold md:block'></div>
      </div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className='flex flex-wrap items-center md:flex-nowrap p-4 bg-white shadow-md rounded-lg m-2'
          >
            <div className='flex-1 p-2 text-center'>{post.title}</div>
            <div className='flex-1 p-2 text-gray-600 text-center'>
              {removeHTMLTags(post.content.slice(0, 100))}
            </div>
            <div className='flex-1 p-2 text-center'>
              {new Date(post.created_at).toLocaleDateString()}
            </div>
            <div className='flex-1 p-2 text-center'>{post.category}</div>
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
                <EditPost id={Number(post.id)} />
              </div>
              <div className='w-full sm:w-auto'>
                <DeletePost id={Number(post.id)} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='p-10'>
          <NoPostsFound />
        </div>
      )}
    </div>
  );
}
