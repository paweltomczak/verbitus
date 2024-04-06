'use client';

import React, { useState } from 'react';
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { kanit } from './fonts';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState('Category 1');

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
              <span className={`${kanit.className} text-3xl font-medium`}>
                Verbitus
              </span>
            </div>
          </div>

          <div className='hidden lg:flex flex-grow justify-center items-center space-x-4'>
            {['Category 1', 'Category 2', 'Category 3'].map((category) => (
              <a
                key={category}
                href='#'
                className={`px-3 py-2 ${
                  isActive === category
                    ? 'border-b border-blue-500 transition-all duration-300'
                    : 'hover:text-blue-500'
                }`}
                onClick={() => setIsActive(category)}
              >
                {category}
              </a>
            ))}
          </div>

          <div className='flex-1 lg:flex-none flex justify-end'>
            <MagnifyingGlassIcon className='h-6 w-6' />
          </div>
        </div>

        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} px-4`}>
          <a href='#' className='block px-3 py-2 hover:bg-gray-100'>
            Category 1
          </a>
          <a href='#' className='block px-3 py-2 hover:bg-gray-100'>
            Category 2
          </a>
          <a href='#' className='block px-3 py-2 hover:bg-gray-100'>
            Category 3
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
