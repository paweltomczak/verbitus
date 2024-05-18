'use client';

import { addCommentToPost } from '@/app/lib/actions';
import Button from '../common/Button';
import { useFormState } from 'react-dom';
import Message from '../dashboard/Message';

export const CommentForm = ({ postId }: { postId: string }) => {
  const addCommentToPostWithId = addCommentToPost.bind(null, postId);
  const initialState = { message: '', type: '', resetKey: '' };
  const [state, dispatch] = useFormState(addCommentToPostWithId, initialState);

  return (
    <div className='mb-4'>
      <form action={dispatch} key={state?.resetKey}>
        <input
          className='w-full bg-body dark:bg-darkSkeleton p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2'
          type='text'
          placeholder='Your name'
          name='name'
        />
        <textarea
          className='w-full bg-body dark:bg-darkSkeleton p-3 border rounded-lg focus:outline-none focus:ring-2'
          rows={3}
          placeholder='Write your comment...'
          name='comment'
        ></textarea>
        <Button
          type='submit'
          otherClasses='my-2 dark:bg-darkSkeleton dark:hover:bg-hover'
        >
          Add Comment
        </Button>
      </form>
      {state?.message && (
        <Message
          message={state.message}
          type={state.type as 'success' | 'error'}
        />
      )}
    </div>
  );
};
