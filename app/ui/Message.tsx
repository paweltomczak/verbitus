const Message = ({
  message,
  type,
}: {
  message: string;
  type: 'error' | 'success';
}) => {
  const backgroundColorClass = type === 'error' ? 'bg-red-500' : 'bg-green-200';
  const textColorClass = type === 'error' ? 'text-white' : 'text-black';

  return (
    <div
      className={`flex items-center text-sm font-bold px-4 py-3 my-4 rounded-md text-center w-full ${backgroundColorClass} ${textColorClass}`}
      role='alert'
    >
      <p className='mx-auto'>{message}</p>
    </div>
  );
};

export default Message;
