import { useState } from 'react';
import { useFormStatus } from 'react-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  otherClasses?: string;
  loading?: boolean;
}

export default function Button({
  children,
  otherClasses,
  loading,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      type='submit'
      className={` w-full bg-primary hover:bg-hover text-white font-bold py-3 px-3 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center transition duration-150 ease-in-out ${
        (pending || loading) && `disabled:opacity-30`
      } ${otherClasses}`}
      disabled={pending || loading}
    >
      {(pending || loading) && (
        <div className='border-t-transparent animate-spin rounded-full border-4 border-opacity-50 h-5 w-5'></div>
      )}
      {!loading && !pending && children}
    </button>
  );
}
