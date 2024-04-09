import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function TagInput({
  tags,
  setTags,
  suggestedTags,
}: {
  tags: string[] | undefined;
  setTags: (newTags: string[]) => void;
  suggestedTags: { id: number; name: string }[];
}) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    const effectiveTags = tags || [];

    const filtered = suggestedTags?.filter(
      (suggestedTag) =>
        suggestedTag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !effectiveTags.includes(suggestedTag.name)
    );
    setFilteredSuggestions(filtered);
  }, [inputValue, tags, suggestedTags]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTag = (tagName: string) => {
    const effectiveTags = tags || [];
    if (!effectiveTags.includes(tagName)) {
      setTags([...effectiveTags, tagName]);
    }
    setInputValue('');
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const effectiveTags = tags || [];
    setTags(effectiveTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className='flex flex-col bg-body rounded py-2'>
      <div className='flex flex-wrap items-center'>
        {(tags || []).map((tag, index) => (
          <div
            key={index}
            className='flex items-center bg-primary text-white text-sm font-medium mr-3 px-2 py-1 mb-6 rounded'
          >
            {tag}
            <a
              onClick={() => handleRemoveTag(index)}
              className='bg-transparent hover:text-red-500 rounded ml-2 p-1 cursor-pointer'
            >
              <XMarkIcon className='h-4 w-4' />
            </a>
          </div>
        ))}
      </div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        className='p-3 border border-gray-300 rounded shadow-sm bg-body'
        placeholder='Add a tag...'
      />
      {inputValue && filteredSuggestions?.length > 0 && (
        <ul className=' bg-body shadow rounded overflow-auto max-h-40'>
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className='cursor-pointer p-3 hover:bg-primary hover:text-white'
              onClick={() => handleAddTag(suggestion.name)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
