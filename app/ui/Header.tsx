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
    <header className=' my-3 pb-3'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center py-3'>
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
            <div className='text-center lg:text-left'>
              <Link
                href={'/'}
                className={`${kanit.className} text-3xl font-[600]`}
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
                }`}
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

        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} px-4`}>
          {categories.map((category) => (
            <a
              key={category.id}
              href='#'
              className='block py-2 hover:bg-gray-100 text-center'
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
