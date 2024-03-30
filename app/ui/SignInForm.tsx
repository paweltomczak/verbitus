'use client';

import Button from './Button';
import { useFormState } from 'react-dom';
import { SignInUser } from '@/app/lib/actions';
import Message from './Message';
import Link from 'next/link';

export default function SignInForm() {
  const initialState = { message: '', type: '' };

  const [message, dispatch] = useFormState(SignInUser, initialState);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold font-poppins text-gray-900'>
            Sign In into your account
          </h2>
        </div>
        <form action={dispatch} className='w-full max-w-md'>
          <div className='mb-4'>
            <input
              name='email'
              type='email'
              placeholder='Email'
              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border-gray-300 rounded-md p-4'
              required
            />
          </div>
          <div className='mb-4'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border-gray-300 rounded-md p-4'
              required
            />
          </div>

          <div className='flex items-center justify-between'>
            <Button>Log In</Button>
          </div>
        </form>
        <div>
          <Link
            href='/signup'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Doesn't have an account? Sign Up
          </Link>
        </div>
        {message.message && (
          <Message
            message={message.message}
            type={message.type as 'success' | 'error'}
          />
        )}{' '}
      </div>
    </div>
  );
}
