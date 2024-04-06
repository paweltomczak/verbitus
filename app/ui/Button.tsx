import { useFormStatus } from 'react-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  otherClasses?: string;
}

export default function Button({
  children,
  otherClasses,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      {...rest}
      type='submit'
      className={`${otherClasses} w-full bg-primary hover:bg-hover text-white font-bold py-3 px-3 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center transition duration-150 ease-in-out ${
        pending && `disabled:opacity-30`
      }`}
      disabled={pending}
    >
      {pending && (
        <div className='border-t-transparent animate-spin rounded-full border-4 border-opacity-50 h-5 w-5'></div>
      )}
      {!pending && children}
    </button>
  );
}
