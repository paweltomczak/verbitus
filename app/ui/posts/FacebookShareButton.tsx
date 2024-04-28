'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    FB: any;
  }
}

export const FacebookShareButton = ({
  siteURL,
}: {
  siteURL: string | undefined;
}) => {
  const pathname = usePathname();

  useEffect(() => {
    const loadFbSdk = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.onload = () => {
          window.FB.init();
          window.FB.XFBML.parse();
        };
        document.body.appendChild(script);
      }
    };

    loadFbSdk();
  }, []);

  return (
    <div
      className='fb-share-button'
      data-href={`${siteURL}${pathname}`}
      data-layout='button'
      data-size='large'
    >
      <a
        target='_blank'
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          siteURL + pathname
        )}&src=sdkpreparse`}
        className='fb-xfbml-parse-ignore'
        rel='noopener noreferrer'
      >
        Share on Facebook
      </a>
    </div>
  );
};
