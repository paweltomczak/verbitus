'use client';

import { deletePost } from '@/app/lib/actions';
import Button from '../../Button';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id);
  return (
    <form action={deletePostWithId}>
      <Button otherClasses='w-40 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
        <TrashIcon className='w-6 h-6 mr-2' />
        Delete
      </Button>
    </form>
  );
}

export function EditPost({ id }: { id: string }) {
  const editPostWithId = deletePost.bind(null, id);
  return (
    <form action={editPostWithId}>
      <Button otherClasses='w-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
        <PencilIcon className='w-6 h-6 mr-2' />
        Edit
      </Button>
    </form>
  );
}
