'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { kanit } from '../styles/fonts';
import Link from 'next/link';
import { categoryToURL } from '../../lib/utils';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Theme } from '@/app/lib/interfaces';
import { Search } from './Search';

export default function Header({
  categories,
  theme,
}: {
  categories: { id: number; name: string }[];
  theme: Theme;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showInput, setShowInput] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (categoryName: string) => {
    return pathname.includes(categoryName);
  };

  const handleIconClick = () => {
    setShowInput(!showInput);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowInput(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef, isMenuOpen]);

  return (
    <header className='max-w-6xl mx-auto px-4'>
      <div className='w-full'>
        <div className='flex justify-between items-center py-7 min-h-[100px]'>
          <div className='lg:hidden'>
            <button
              className='align-middle'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className='h-6 w-6' />
              ) : (
                <Bars3BottomLeftIcon className='h-6 w-6' />
              )}
            </button>
          </div>

          <div
            className={`flex-1 lg:flex-none ${showInput && 'md:block hidden'}`}
          >
            <div className='text-center lg:text-left h-full flex items-center justify-center'>
              <Link
                href={'/'}
                className={`${kanit.className} text-3xl font-semibold hover:text-hover`}
              >
                Verbitus
              </Link>
            </div>
          </div>

          <div
            className={`hidden flex-grow justify-center items-center space-x-4 ${
              showInput ? 'hidden' : 'md:flex'
            }`}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${categoryToURL(category.name)}`}
                className={`px-3 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                  isActive(categoryToURL(category.name))
                    ? ' text-primary transition font-bold dark:text-body'
                    : 'hover:text-hover'
                } text-sm uppercase`}
                style={{ minWidth: '120px', maxWidth: '180px' }}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div
            ref={searchRef}
            className={`flex justify-end ${showInput && 'flex-grow w-full'}`}
          >
            <Search handleIconClick={handleIconClick} showInput={showInput} />
          </div>
          <div className='ml-6'>
            <ThemeSwitcher theme={theme} />
          </div>
        </div>
        <div
          ref={menuRef}
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} px-4 pb-6`}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${categoryToURL(category.name)}`}
              className={`block px-3 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                isActive(categoryToURL(category.name))
                  ? 'font-bold '
                  : 'hover:text-hover'
              } text-sm uppercase`}
              style={{ minWidth: '120px', maxWidth: '180px' }}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
