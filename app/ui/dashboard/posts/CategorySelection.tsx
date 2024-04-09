import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function CategorySelect({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: { id: number; name: string }[];
  selectedCategory: string | undefined;
  setSelectedCategory: (name: string | undefined) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCategory = (id: number) => {
    const category = categories.find((category) => category.id === id);
    setSelectedCategory(category?.name);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col bg-body rounded hover:cursor-pointer pt-2'>
      <div className='relative'>
        <a
          onClick={() => setIsOpen(!isOpen)}
          className='flex justify-between items-center px-5 py-3 w-full  bg-body text-left  rounded shadow-sm border border-gray-300'
        >
          {selectedCategory || 'Select a Category'}
          {isOpen ? (
            <ChevronUpIcon className='w-5 h-5' />
          ) : (
            <ChevronDownIcon className='w-5 h-5' />
          )}
        </a>
        {isOpen && (
          <ul className=' bg-body shadow rounded overflow-auto max-h-40'>
            {categories.map((category) => (
              <li
                key={category.id}
                className='cursor-pointer p-3 hover:bg-primary hover:text-white'
                onClick={() => handleSelectCategory(category.id)}
              >
                {selectedCategory === category.name ? (
                  <span className='font-bold'>{category.name}</span>
                ) : (
                  <span className='font-normal'>{category.name}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
