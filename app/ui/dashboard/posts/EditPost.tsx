import { fetchCategories, fetchPostById, fetchTags } from '@/app/lib/data';
import EditPostForm from '@/app/ui/dashboard/posts/EditPostForm';

export const EditPost = async ({ id }: { id: string }) => {
  const post = await fetchPostById(id);
  const suggestedTags = await fetchTags();
  const categories = await fetchCategories();

  return (
    <div className='p-4 md:p-10 flex-grow flex-1'>
      <EditPostForm
        post={post}
        suggestedTags={suggestedTags}
        categories={categories}
      />
    </div>
  );
};
