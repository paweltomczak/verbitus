import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-primary text-body p-12 mt-10'>
      <div className='container mx-auto flex flex-col sm:flex-row justify-evenly items-center text-center'>
        <ul className='space-y-2 sm:space-y-0 sm:flex sm:space-x-10'>
          <li>
            <a href='/home' className='hover:text-hover'>
              Home
            </a>
          </li>
          <li>
            <a href='/about' className='hover:text-hover'>
              About
            </a>
          </li>
          <li>
            <a href='/blog' className='hover:text-hover'>
              Blog
            </a>
          </li>
          <li>
            <a href='/contact' className='hover:text-hover'>
              Contact
            </a>
          </li>
          <li>
            <a href='/privacy' className='hover:text-hover'>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href='/terms' className='hover:text-hover'>
              Terms of Service
            </a>
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
