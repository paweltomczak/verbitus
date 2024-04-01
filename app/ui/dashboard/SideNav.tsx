'use client';

import { useState } from 'react';
import {
  HomeIcon,
  DocumentTextIcon,
  PencilIcon,
  FolderPlusIcon,
  TagIcon,
  ArrowLeftEndOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { signOut } from '@/app/lib/actions';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '#' },
  { name: 'All Posts', icon: DocumentTextIcon, href: '#' },
  { name: 'Create Post', icon: PencilIcon, href: '#' },
  { name: 'Add Category', icon: FolderPlusIcon, href: '#' },
  { name: 'Add Tags', icon: TagIcon, href: '#' },
];

export default function SideNav() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='bg-primary md:hidden p-4 flex justify-around w-full'>
        {navigation.map((item, index) => (
          <button
            key={index}
            className='flex items-center justify-center'
            aria-label={item.name}
          >
            <item.icon className='h-6 w-6 text-white' />
          </button>
        ))}
        <button
          onClick={async () => await signOut()}
          className='flex items-center justify-center'
        >
          <ArrowLeftEndOnRectangleIcon
            className='h-6 w-6 text-white'
            aria-label='Sign Out'
          />
        </button>
      </div>
      <div
        className={`bg-primary ${
          expanded ? 'w-64' : 'w-16'
        } p-5 pt-8 relative duration-100 h-screen flex-col justify-between md:block hidden`}
      >
        <div>
          <button
            className='absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1'
            style={{
              height: '50px',
              width: '30px',
            }} // Inline style for precise positioning
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronLeftIcon className='h-4 w-4 text-gray-800 hover:text-hover' />
            ) : (
              <ChevronRightIcon className='h-4 w-4 text-gray-800 hover:text-hover' />
            )}
          </button>

          <div className='mt-5 space-y-6'>
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={`flex items-center ${
                  expanded ? 'justify-start' : 'justify-center'
                } text-white cursor-pointer hover:text-hover`}
              >
                <div className='flex items-center justify-center w-12'>
                  <item.icon className='h-6 w-6' />
                </div>
                {expanded && (
                  <div className='flex-1 overflow-hidden max-w-xs'>
                    <span className='whitespace-nowrap opacity-100'>
                      {item.name}
                    </span>
                  </div>
                )}
              </Link>
            ))}
            <Link
              href='#'
              onClick={async () => await signOut()}
              className={`flex items-center ${
                expanded ? 'justify-start' : 'justify-center'
              } text-white cursor-pointer hover:text-hover`}
            >
              <div className='flex items-center justify-center w-12'>
                <ArrowLeftEndOnRectangleIcon className='h-6 w-6' />
              </div>
              {expanded && (
                <div className='flex-1 overflow-hidden max-w-xs'>
                  <span className='whitespace-nowrap opacity-100'>
                    Sign Out
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
