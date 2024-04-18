import { fetchCategories } from '../lib/data';
import Header from '../ui/Header';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();

  return (
    <>
      <Header categories={categories} />
      {children}
    </>
  );
}
