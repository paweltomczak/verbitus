import '@/app/ui/styles/global.css';
import { dm_sans } from './ui/styles/fonts';
import Scroll from './ui/common/Scroll';
import { cookies } from 'next/headers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.verbitus.com'),
  title: {
    template: '%s | Verbitus',
    default:
      'Insights on Finance, Tech, Real Estate, Travel, Automotive, and Earning',
  },
  description:
    'Explore the latest in Insurance, Cryptocurrency, Web Development, and more. Dive into our comprehensive guides on Real Estate, Travel Tips, and ways to Make Money Online. Your ultimate resource for all things Finance, Technology, and Lifestyle.',
  keywords: [
    'finance, insurance, cryptocurrency, personal finance, technology, digital marketing, online learning, blogging, web development, real estate, travel, automotive, earn money online',
  ],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

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
