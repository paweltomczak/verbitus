import { fetchCommentsByPostId } from '@/app/lib/data';
import { CommentForm } from './CommentForm';

export const Comments = async ({ postId }: { postId: string }) => {
  const comments = await fetchCommentsByPostId(postId);

  return (
    <section className='max-w-3xl mx-auto py-2'>
      <h2 className='text-xl font-bold mb-6'>Leave a Comment:</h2>
      <CommentForm postId={postId} />
      {comments.length === 0 ? (
        <p className='py-4'>No comments yet. Be the first to comment!</p>
      ) : (
        <ul className='py-2'>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className='bg-skeleton dark:bg-darkSkeleton p-4 my-5 rounded-lg'
            >
              <p className='font-bold'>{comment.name}</p>
              <p className='text-sm text-gray-500 pb-2'>
                {new Date(comment.date).toLocaleString()}
              </p>
              <p>{comment.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
