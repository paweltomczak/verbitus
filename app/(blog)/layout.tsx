import { cookies } from 'next/headers';
import { fetchCategories } from '../lib/data';
import Header from '../ui/layout/Header';
import Script from 'next/script';
import { Footer } from '../ui/layout/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

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
      <Footer />
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENSE_CLIENT_ID}`}
        crossOrigin='anonymous'
      />
      <Script async src='https://platform.twitter.com/widgets.js' />
      <div id='fb-root'></div>
      <Script
        async
        defer
        crossOrigin='anonymous'
        src='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0'
        nonce='IPpdCVyX'
      />
      <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_ID}`} />
    </>
  );
}
