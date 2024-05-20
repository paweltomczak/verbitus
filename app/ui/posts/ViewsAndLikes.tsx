'use client';

import { toggleLikesCount, viewsIncrement } from '@/app/lib/actions';
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useOptimistic } from 'react';

export const ViewsAndLikes = ({
  postId,
  viewCount,
  likesCount,
}: {
  postId: string;
  viewCount: number;
  likesCount: number;
}) => {
  const [liked, setLiked] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likesCount,
    (currentLikes, change: number) => {
      return currentLikes + change;
    }
  );

  useEffect(() => {
    viewsIncrement(postId);
  }, [postId]);

  const toggleLikes = () => {
    const change = liked ? -1 : 1;
    setOptimisticLikes(change);
    setLiked(!liked);

    toggleLikesCount(postId, !liked);
  };

  const filledHeartClasses = `fill-red-600 border-red-500 text-red-500`;

  return (
    <section className='flex justify-evenly mt-10 py-5 bg-primary dark:bg-darkSkeleton text-body items-center rounded-lg'>
      <div className='flex gap-2 items-center'>
        <EyeIcon className='w-6 h-6' />
        <span>
          {viewCount} {viewCount > 1 ? 'views' : 'view'}
        </span>
      </div>
      <div className='flex gap-2 items-center'>
        {optimisticLikes}
        <span>{optimisticLikes === 1 ? 'like' : 'likes'}</span>
        <HeartIcon
          className={`w-6 h-6 cursor-pointer hover:fill-red-600 hover:border-red-500 hover:text-red-500 ${
            liked && filledHeartClasses
          }`}
          onClick={toggleLikes}
        />
      </div>
    </section>
  );
};
