import { fetchCategories, fetchTags } from '@/app/lib/data';
import CreatePostForm from '@/app/ui/dashboard/posts/CreatePostForm';

export const CreatePost = async () => {
  const suggestedTags = await fetchTags();
  const categories = await fetchCategories();

  return (
    <div className='p-4 md:p-10 flex-grow flex-1'>
      <CreatePostForm suggestedTags={suggestedTags} categories={categories} />
    </div>
  );
};
