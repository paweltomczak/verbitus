import { getUser } from '../lib/actions';
import { redirect } from 'next/navigation';
import SignUpForm from '../ui/SignUpForm';

export default async function Page() {
  const user = await getUser();

  if (user) redirect('/dashboard');

  return <SignUpForm />;
}
