'use client';

import React, { useState } from 'react';
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { kanit } from './fonts';
import Link from 'next/link';

export default function Header({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>(1);

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
                className={`${kanit.className} text-3xl font-medium`}
              >
                Verbitus
              </Link>
            </div>
          </div>

          <div className='hidden lg:flex flex-grow justify-center items-center space-x-4'>
            {categories.map((category) => (
              <a
                key={category.id}
                href='#'
                className={`px-3 py-2 ${
                  isActive === category.id
                    ? 'border-b border-blue-500 transition-all duration-300'
                    : 'hover:text-blue-500'
                } whitespace-nowrap overflow-hidden text-ellipsis`}
                style={{ minWidth: '120px', maxWidth: '180px' }} // Control width here
                onClick={() => setIsActive(category.id)}
              >
                {category.name}
              </a>
            ))}
          </div>

          <div className='flex-1 lg:flex-none flex justify-end'>
            <MagnifyingGlassIcon className='h-6 w-6' />
          </div>
        </div>
      </div>
    </header>
  );
}
