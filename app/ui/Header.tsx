'use client';

import React, { useState } from 'react';
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { kanit } from './fonts';
import Link from 'next/link';
import { categoryToURL, urlToCategory } from '../lib/utils';
import { usePathname } from 'next/navigation';

export default function Header({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const isActive = (categoryName: string) => {
    return pathname.includes(categoryName);
  };

  return (
    <header className='max-w-6xl mx-auto px-4'>
      <div className='w-full'>
        <div className='flex justify-between items-center py-7 h-full'>
          <div className='lg:hidden flex-1'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <XMarkIcon className='h-6 w-6' />
              ) : (
                <Bars3BottomLeftIcon className='h-6 w-6' />
              )}
            </button>
          </div>

          <div className='flex-1 lg:flex-none'>
            <div className='text-center lg:text-left h-full flex items-center justify-center'>
              <Link
                href={'/'}
                className={`${kanit.className} text-3xl font-semibold`}
              >
                Verbitus
              </Link>
            </div>
          </div>

          <div className='hidden lg:flex flex-grow justify-center items-center space-x-4'>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${categoryToURL(category.name)}`}
                className={`px-3 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                  isActive(categoryToURL(category.name))
                    ? ' text-primary transition font-bold'
                    : 'hover:text-hover'
                } text-sm uppercase`}
                style={{ minWidth: '120px', maxWidth: '180px' }}
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className='flex-1 lg:flex-none flex justify-end'>
            <MagnifyingGlassIcon className='h-6 w-6' />
          </div>
        </div>
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} px-4`}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${categoryToURL(category.name)}`}
              className={`block px-3 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                isActive(categoryToURL(category.name))
                  ? 'font-bold text-primary'
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
