import Link from 'next/link';
import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-primary text-body p-12 mt-10'>
      <div className='container mx-auto flex flex-col sm:flex-row justify-evenly items-center text-center'>
        <ul className='space-y-2 sm:space-y-0 sm:flex sm:space-x-10'>
          <li>
            <Link href='/' className='hover:text-hover'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/privacy' className='hover:text-hover'>
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
      <div className='text-center text-sm mt-10'>
        © {currentYear} Verbitus. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
