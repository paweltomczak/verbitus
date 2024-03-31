import { redirect } from 'next/navigation';
import { getUser } from '../lib/actions';
import SideNav from '../ui/dashboard/SideNav';

export default async function Page() {
  const user = await getUser();

  if (!user) redirect('/signin');

  return (
    <div className='flex flex-col md:flex-row'>
      <SideNav />
      <div className='flex-grow p-10'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ut
        cum illo earum autem veritatis eius repellat, expedita quia fuga non
        enim sunt quidem id accusamus laudantium, voluptatem vel labore?
      </div>
    </div>
  );
}
