import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const NoPostsFound = () => {
  return (
    <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6 flex flex-col justify-center items-center min-h-96'>
      <ExclamationCircleIcon className='h-8 w-8 mb-3' />
      <p>No Posts found</p>
    </div>
  );
};
