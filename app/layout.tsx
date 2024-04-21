import '@/app/ui/styles/global.css';
import { dm_sans } from './ui/styles/fonts';
import Scroll from './ui/common/Scroll';
import { cookies } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get('theme')?.value;

  return (
    <html lang='en' className={theme}>
      <Scroll />
      <body
        className={`${dm_sans.className} bg-body text-primary dark:bg-primary dark:text-body`}
      >
        {children}
      </body>
    </html>
  );
}
