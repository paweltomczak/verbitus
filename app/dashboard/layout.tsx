import { redirect } from 'next/navigation';
import { getUser } from '@/app/lib/actions';
import SideNav from '@/app/ui/dashboard/SideNav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) redirect('/signin');

  return (
    <div className='flex flex-col md:flex-row'>
      <SideNav />
      <div className='flex-grow p-10'>{children}</div>
    </div>
  );
}
