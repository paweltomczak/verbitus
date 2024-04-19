import SideNav from '@/app/ui/dashboard/SideNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <SideNav />
      {children}
    </div>
  );
}
