import SideNav from '@/app/ui/dashboard/SideNav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col md:flex-row'>
      <SideNav />
      <div className='p-4 md:p-10 flex-grow'>{children}</div>
    </div>
  );
}
