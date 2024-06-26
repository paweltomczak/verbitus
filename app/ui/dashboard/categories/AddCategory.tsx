import { fetchCategories } from '@/app/lib/data';
import { RemoveCategory } from '@/app/ui/dashboard/buttons';
import CreateCategoryForm from '@/app/ui/dashboard/categories/CreateCategoryForm';

export const AddCategory = async () => {
  const categories = await fetchCategories();

  return (
    <div className='md:p-10 flex-grow flex-1 space-y-6 p-4'>
      <CreateCategoryForm />
      <div className='grid grid-cols-3 gap-4'>
        {categories.map((category) => (
          <div
            key={category.id}
            className='flex justify-between items-center bg-primary px-4 py-2 rounded text-white'
          >
            <span>{category.name}</span>
            <RemoveCategory id={category.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
