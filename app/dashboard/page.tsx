import { redirect } from 'next/navigation';
import { getUser } from '../lib/actions';

export default async function Page() {
  const user = await getUser();

  if (!user) redirect('/signin');

  return <div>Dashboard</div>;
}
