import '@/app/ui/global.css';
import { dm_sans } from './ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${dm_sans.className}`}>{children}</body>
    </html>
  );
}
