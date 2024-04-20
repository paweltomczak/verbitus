import '@/app/ui/global.css';
import { dm_sans } from './ui/fonts';
import Scroll from './ui/Scroll';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Scroll />
      <body className={`${dm_sans.className} bg-body`}>{children}</body>
    </html>
  );
}
