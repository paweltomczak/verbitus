import { fetchAll, fetchCategories, fetchTags } from '@/app/lib/data';
import { DataForAI } from '@/app/lib/interfaces';
import CreatePostForm from '@/app/ui/dashboard/posts/CreatePostForm';

export const CreatePost = async () => {
  const suggestedTags = await fetchTags();
  const categories = await fetchCategories();
  const data = await fetchAll();

  const dataForAI = data.reduce(
    (acc, item) => {
      if (item.type === 'post') {
        acc.titles.push(item.name);
      } else if (item.type === 'tag') {
        acc.tags.push(item.name);
      } else if (item.type === 'category') {
        acc.categories.push(item.name);
      }

      return acc;
    },
    { titles: [], tags: [], categories: [] }
  );

  return (
    <div className='p-4 md:p-10 flex-grow flex-1'>
      <CreatePostForm
        suggestedTags={suggestedTags}
        categories={categories}
        dataForAI={dataForAI as DataForAI}
      />
    </div>
  );
};
