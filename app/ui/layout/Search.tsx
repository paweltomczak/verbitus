import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Search = ({
  handleIconClick,
  showInput,
}: {
  handleIconClick: () => void;
  showInput: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 700);

  return (
    <div
      className={`flex items-center ${
        showInput ? 'w-full' : 'w-[24px]'
      } transition-all duration-300 ease-in-out`}
    >
      {showInput && (
        <input
          ref={inputRef}
          className='ml-10 md:pt-[5px] inset-0 w-full pr-10 text-sm outline-none bg-body dark:bg-primary'
          placeholder='Search...'
          onChange={(e) => handleSearch(e.target.value)}
        />
      )}
      <div className='w-[24px] h-[24px] ml-auto'>
        <MagnifyingGlassIcon
          className='h-6 w-6 cursor-pointer'
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
};
