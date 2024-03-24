import { useState } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import LogInForm from '@/components/LoginForm';
import SignInForm from '@/components/SignInForm';

const AuthPage = () => {
  const { user } = useRequireAuth();
  const [activeForm, setActiveForm] = useState('login');

  const toggleForm = () => {
    setActiveForm((prevForm) => (prevForm === 'login' ? 'signup' : 'login'));
  };

  return (
    !user && (
      <>
        {activeForm === 'login' ? (
          <LogInForm onSwitchForm={toggleForm} />
        ) : (
          <SignInForm onSwitchForm={toggleForm} />
        )}
      </>
    )
  );
};

export default AuthPage;
