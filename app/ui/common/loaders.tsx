export function Spinner() {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='border-6 border-hover border-t-transparent w-10 h-10 rounded-full animate-spin'></div>
    </div>
  );
}

export const HomePageSkeletons = () => {
  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap'>
      <div className='w-full mb-4 sm:mb-12 px-4 py-4'>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:w-full overflow-hidden h-[320px] relative'>
            <div className='w-full h-full bg-skeleton dark:bg-darkSkeleton rounded'></div>
            <div className='shimmer dark:dark-shimmer'></div>
          </div>
          <div className='p-4 md:px-8 md:pt-4 w-full relative overflow-hidden'>
            <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-1/4 mb-4'></div>
            <div className='h-8 bg-skeleton dark:bg-darkSkeleton rounded w-3/4 my-6'></div>
            <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-2'></div>
            <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-2'></div>
            <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-2'></div>
            <div className='shimmer dark:dark-shimmer'></div>
          </div>
        </div>
      </div>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export const PostSearchSkeletons = () => {
  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap'>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export const PostDetailsSkeleton = () => {
  return (
    <div className='w-full'>
      <div className='relative overflow-hidden md:leading-tight tracking-tighter md:max-w-3xl md:mx-auto text-3xl md:text-5xl text-center font-bold m-10'>
        <div className='h-12 bg-skeleton dark:bg-darkSkeleton rounded w-full mx-auto mb-6'></div>
        <div className='h-12 bg-skeleton dark:bg-darkSkeleton rounded w-3/4 mx-auto'></div>
        <div className='shimmer'></div>
      </div>
      <div className='relative overflow-hidden flex items-center justify-center text-sm gap-2 font-light text-gray-400 pb-8'>
        <div className='w-5 h-5 bg-skeleton dark:bg-darkSkeleton rounded mr-1'></div>
        <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-24'></div>
        <div className='shimmer dark:dark-shimmer'></div>
      </div>
      <div className='relative max-w-3xl m-auto h-[200px] md:h-[380px] bg-skeleton dark:bg-darkSkeleton overflow-hidden'>
        <div className='shimmer dark:dark-shimmer'></div>
      </div>
      <div className='max-w-3xl mx-auto lg:px-0 px-6 text-left my-6 font-light'>
        <div className='relative leading-relaxed overflow-hidden mb-10 mt-12'>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-4'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-5/6 mb-4'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-2/3'></div>
          <div className='shimmer dark:dark-shimmer'></div>
        </div>
        <div className='relative leading-relaxed overflow-hidden'>
          <div className='h-12 bg-skeleton dark:bg-darkSkeleton rounded w-3/4 mb-10'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-4'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-5/6 mb-4'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-2/3 mb-4'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-4'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-5/6 mb-4'></div>
          <div className='h-6 bg-skeleton dark:bg-darkSkeleton rounded w-2/3 mb-4'></div>
          <div className='shimmer dark:dark-shimmer'></div>
        </div>
        <div className='py-5 mt-5 flex justify-between items-start'>
          <div className='relative md:w-2/3 overflow-hidden'>
            <div className='inline-block bg-skeleton dark:bg-darkSkeleton text-body text-sm font-semibold mr-3 mb-3 px-5 py-4 rounded-full w-20'></div>
            <div className='inline-block bg-skeleton dark:bg-darkSkeleton text-body text-sm font-semibold mr-3 mb-3 px-5 py-4 rounded-full w-20'></div>
            <div className='shimmer dark:dark-shimmer'></div>
          </div>
          <div className='relative flex gap-6 overflow-hidden'>
            <div className='h-8 bg-skeleton dark:bg-darkSkeleton rounded-full w-20 mr-2'></div>
            <div className='h-8 bg-skeleton dark:bg-darkSkeleton rounded w-20'></div>
            <div className='shimmer dark:dark-shimmer'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CategoryAndTagsPostsSkeleton = () => {
  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-wrap py-6'>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

const PostSkeleton = () => {
  return (
    <div className='w-full md:w-1/2 mb-8 px-4'>
      <div className='flex flex-col items-center'>
        <div className='relative w-full overflow-hidden h-[250px] bg-skeleton dark:bg-darkSkeleton rounded'>
          <div className='shimmer dark:dark-shimmer'></div>
        </div>
        <div className='px-4 pt-4 w-full relative overflow-hidden'>
          <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-1/4 mb-4'></div>
          <div className='h-8 bg-skeleton dark:bg-darkSkeleton rounded w-3/4 my-6'></div>
          <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-2'></div>
          <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-2'></div>
          <div className='h-5 bg-skeleton dark:bg-darkSkeleton rounded w-full mb-2'></div>
          <div className='shimmer dark:dark-shimmer'></div>
        </div>
      </div>
    </div>
  );
};
