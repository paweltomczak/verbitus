'use client';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='py-7 flex w-full justify-center items-center'>
      <PaginationArrow
        dir='left'
        isDiabled={currentPage <= 1}
        href={createPageURL(currentPage - 1)}
      />

      <p>
        Page {currentPage} of {totalPages}
      </p>

      <PaginationArrow
        dir='right'
        isDiabled={currentPage >= totalPages}
        href={createPageURL(currentPage + 1)}
      />
    </div>
  );
};

const PaginationArrow = ({
  dir,
  isDiabled,
  href,
}: {
  dir: 'left' | 'right';
  isDiabled: boolean;
  href: string;
}) => {
  const arrowIcon =
    dir === 'left' ? (
      <ArrowLeftCircleIcon className='w-10 mr-2' />
    ) : (
      <ArrowRightCircleIcon className='w-10 ml-2' />
    );

  return isDiabled ? (
    <div className='text-gray-300 dark:text-gray-600'>{arrowIcon}</div>
  ) : (
    <Link href={href} className='hover:text-hover'>
      {arrowIcon}
    </Link>
  );
};
