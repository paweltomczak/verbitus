import { fetchTags } from '@/app/lib/data';
import { RemoveTag } from '@/app/ui/dashboard/buttons';
import CreateTagForm from '@/app/ui/dashboard/tags/CreateTagForm';

export const AddTags = async () => {
  const tags = await fetchTags();

  return (
    <div className='md:p-10 flex-grow flex-1 space-y-6 p-4'>
      <CreateTagForm />
      <div className='grid grid-cols-3 gap-4'>
        {tags.map((tag) => (
          <div
            key={tag.id}
            className='flex justify-between items-center bg-primary px-4 py-2 rounded text-white'
          >
            <span>{tag.name}</span>
            <RemoveTag id={tag.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
