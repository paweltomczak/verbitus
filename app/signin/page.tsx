import { getUser } from '../lib/actions';
import { redirect } from 'next/navigation';
import SignInForm from '../ui/SignInForm';

export default async function Page() {
  const user = await getUser();

  if (user) redirect('/dashboard');

  return <SignInForm />;
}
