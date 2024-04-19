export default async function Page() {
  return (
    <div className='p-4 md:p-10 flex-grow flex-1'>
      <h2 className='text-2xl font-semibold mb-4'>
        Welcome Back,
        <br />
      </h2>
      <p className='text-gray-700 mb-4'>
        As an admin, you have full access to manage the platform.
      </p>
    </div>
  );
}
