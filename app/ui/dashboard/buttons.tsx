'use client';

import { deleteCategory, deletePost, deleteTag } from '@/app/lib/actions';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import Button from '../common/Button';
import { useState } from 'react';

export function DeletePost({ id }: { id: number }) {
  const deletePostWithId = deletePost.bind(null, id);
  const [state, deleteDispatch] = useFormState(deletePostWithId, undefined);

  return (
    <form action={deleteDispatch}>
      <Button otherClasses='py-3 px-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded  items-center'>
        <TrashIcon className='w-5 h-5' />
      </Button>
    </form>
  );
}

export function EditPost({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);

  return (
    <Link href={`/dashboard/posts/${id}/edit`}>
      <Button
        onClick={() => setLoading(true)}
        loading={loading}
        otherClasses=' py-3 px-3 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex justify-center items-center'
      >
        <PencilIcon className='w-5 h-5' />
      </Button>
    </Link>
  );
}

export function RemoveTag({ id }: { id: number }) {
  const deleteTagWithId = deleteTag.bind(null, id);
  const [state, deleteTagDispatch] = useFormState(deleteTagWithId, undefined);

  return (
    <form action={deleteTagDispatch}>
      <Button otherClasses='py-2 px-0 hover:bg-primary text-white font-bold rounded  items-center'>
        <XMarkIcon className='h-5 w-5  hover:text-red-500' />
      </Button>
    </form>
  );
}

export function RemoveCategory({ id }: { id: number }) {
  const deleteCategoryWithId = deleteCategory.bind(null, id);
  const [state, deleteCategoryDispatch] = useFormState(
    deleteCategoryWithId,
    undefined
  );

  return (
    <form action={deleteCategoryDispatch}>
      <Button otherClasses='py-2 px-0 hover:bg-primary text-white font-bold rounded  items-center'>
        <XMarkIcon className='h-5 w-5  hover:text-red-500' />
      </Button>
    </form>
  );
}
