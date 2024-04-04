import SideNav from '@/app/ui/dashboard/SideNav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col md:flex-row'>
      <SideNav />
      <div className='flex-grow p-10'>{children}</div>
    </div>
  );
}
