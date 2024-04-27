'use client';

import { createCategory } from '@/app/lib/actions';
import Button from '@/app/ui/common/Button';
import { useFormState } from 'react-dom';
import Message from '../Message';

export default function CreateCategoryForm() {
  const [state, dispatchCategory] = useFormState(createCategory, undefined);
  return (
    <div>
      <form action={dispatchCategory} key={state?.resetKey}>
        <input
          type='text'
          name='category'
          className='px-4 py-3 mb-4 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-body'
          placeholder='Add new Category'
        />
        <Button type='submit'>Add Category</Button>
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
