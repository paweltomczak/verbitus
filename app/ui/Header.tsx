'use client';

import React, { useState } from 'react';
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState('Category 1');

  return (
    <header className='bg-white my-3 pb-3'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center py-3'>
          {/* Toggle Menu Icon for Mobile */}
          <div className='lg:hidden flex-1'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <XMarkIcon className='h-6 w-6' />
              ) : (
                <Bars3BottomLeftIcon className='h-6 w-6' />
              )}
            </button>
          </div>

          {/* Brand Name - Centered on mobile and Left on PC */}
          <div className='flex-1 lg:flex-none'>
            <div className='text-center lg:text-left'>
              <span className='font-brand text-3xl font-medium'>Verbitus</span>
            </div>
          </div>

          <div className='hidden lg:flex flex-grow justify-center items-center space-x-4'>
            {/* Iterate over categories. This could also come from a dynamic list */}
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

          {/* Search Icon - Right-aligned on all sizes */}
          <div className='flex-1 lg:flex-none flex justify-end'>
            <MagnifyingGlassIcon className='h-6 w-6' />
          </div>
        </div>

        {/* Mobile Menu - show when menu is open */}
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