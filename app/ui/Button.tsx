import { useFormStatus } from 'react-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      type='submit'
      className={`w-full bg-primary hover:bg-hover text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center transition duration-150 ease-in-out ${
        pending && `disabled:opacity-30`
      }`}
      disabled={pending}
    >
      {pending && (
        <div className='border-t-transparent animate-spin rounded-full border-4 border-opacity-50 h-5 w-5 mr-2'></div>
      )}
      {!pending && children}
    </button>
  );
}
