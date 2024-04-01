import { redirect } from 'next/navigation';
import { getUser } from '../lib/actions';

export default async function Page() {
  const user = await getUser();

  if (!user) redirect('/signin');

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>
        Welcome Back,
        <br />
        {user.email}
      </h2>
      <p className='text-gray-700 mb-4'>
        As an admin, you have full access to manage the platform.
      </p>
    </div>
  );
}
