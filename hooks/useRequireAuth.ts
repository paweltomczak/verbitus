import { useEffect } from 'react';
import { useAuth, AuthContextType } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export const useRequireAuth = (redirectUrl: string = '/auth') => {
  const { user } = useAuth() as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectUrl);
    } else {
      router.push('/dashboard');
    }
  }, [user, router, redirectUrl]);

  return { user };
};
