import { cookies } from 'next/headers';
import { fetchCategories } from '../lib/data';
import Header from '../ui/layout/Header';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();
  const theme = cookies().get('theme')?.value === 'dark' ? 'dark' : 'light';

  return (
    <>
      <Header categories={categories} theme={theme} />
      {children}
    </>
  );
}
