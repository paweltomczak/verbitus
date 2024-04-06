'use client';

import { deletePost } from '@/app/lib/actions';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import Button from '../Button';

export function DeletePost({ id }: { id: number }) {
  const deletePostWithId = deletePost.bind(null, id);
  const [state, deleteDispatch] = useFormState(deletePostWithId, undefined);

  return (
    <form action={deleteDispatch}>
      <Button otherClasses='py-3 px-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded inline-flex items-center'>
        <TrashIcon className='w-5 h-5' />
      </Button>
    </form>
  );
}

export function EditPost({ id }: { id: number }) {
  return (
    <Link href={`/dashboard/posts/${id}/edit`}>
      <div className='py-3 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg inline-flex items-center'>
        <PencilIcon className='w-5 h-5' />
      </div>
    </Link>
  );
}
