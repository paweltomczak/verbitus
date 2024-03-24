import { useMutation } from '@apollo/client';
import { VERIFY_USER_TOKEN } from '@/lib/graphql/mutations';
import Message from '@/components/Message';
import { useMessage } from '@/context/MessageContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useState } from 'react';

const LogInForm = ({ onSwitchForm }: { onSwitchForm: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { message, setMessage } = useMessage();
  const [verifyUserToken, { data, loading: tokenLoading, error }] =
    useMutation(VERIFY_USER_TOKEN);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      verifyUserToken({ variables: { token } })
        .then(() => {
          setMessage('Successfully logged in!', 'success');
        })
        .catch((error: string | any) => {
          setMessage(error.message);
        })
        .finally(() => setLoading(false));
    } catch (error: string | any) {
      setMessage('Invalid login credentials.');
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold font-poppins text-gray-900'>
            Log In into your account
          </h2>
        </div>
        <form onSubmit={handleLogin} className='w-full max-w-md'>
          <div className='mb-4'>
            <input
              name='email'
              type='email'
              placeholder='Email'
              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border-gray-300 rounded-md p-4'
              required
            />
          </div>
          <div className='mb-4'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-lg border-gray-300 rounded-md p-4'
              required
            />
          </div>

          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center transition duration-150 ease-in-out ${
                loading && `disabled:opacity-30`
              }`}
              disabled={loading}
            >
              {loading && (
                <div className='border-t-transparent animate-spin rounded-full border-4 border-opacity-50 h-5 w-5 mr-2'></div>
              )}
              {!loading && `Log In`}
            </button>
          </div>
        </form>
        {(error || data || message) && <Message />}
        <div>
          <button
            onClick={onSwitchForm}
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Doesn't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
