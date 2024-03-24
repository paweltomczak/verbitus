import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/lib/graphql/mutations';
import Message from '@/components/Message';
import { useMessage } from '@/context/MessageContext';

const SignInForm = ({ onSwitchForm }: { onSwitchForm: () => void }) => {
  const { setMessage } = useMessage();
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      await createUser({ variables: { email, password } });
      setMessage('User created successfully', 'success');
    } catch (error: string | any) {
      setMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold font-poppins text-gray-900'>
            Create a new account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className='w-full max-w-md'>
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
              {!loading && `Sign In`}
            </button>
          </div>
        </form>
        {(error || data) && <Message />}
        <div>
          <button
            onClick={onSwitchForm}
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Already have an account? Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
