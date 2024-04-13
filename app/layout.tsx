import '@/app/ui/global.css';
import { dm_sans } from './ui/fonts';
import Header from './ui/Header';
import { fetchCategories } from './lib/data';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();

  return (
    <html lang='en'>
      <body className={`${dm_sans.className} bg-body`}>
        <Header categories={categories} />
        {children}
      </body>
    </html>
  );
}
