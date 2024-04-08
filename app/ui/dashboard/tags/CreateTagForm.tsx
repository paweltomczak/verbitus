'use client';

import { createTag } from '@/app/lib/actions';
import Button from '@/app/ui/Button';
import { useFormState } from 'react-dom';
import Message from '../../Message';

export default function CreateTagForm() {
  const [state, dispatchTag] = useFormState(createTag, undefined);
  return (
    <div>
      <form action={dispatchTag}>
        <input
          type='text'
          name='tag'
          className='px-4 py-2 mb-4 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-body'
          placeholder='Add new tag'
        />
        <Button type='submit'>Add Tag</Button>
      </form>
      {state?.message && (
        <Message
          message={state.message}
          type={state.type as 'error' | 'success'}
        />
      )}
    </div>
  );
}
