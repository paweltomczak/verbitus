'use client';

import { useEffect } from 'react';

type TwitterShareProps = {
  hashtags: string[];
};

export const TwitterShareButton = ({ hashtags }: TwitterShareProps) => {
  useEffect(() => {
    const s = document.createElement('script');
    s.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    s.setAttribute('defer', 'true');
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!('twttr' in window)) {
      (window as any).twttr?.widgets.load();
    }
  }, []);

  return (
    <>
      <a
        href='https://twitter.com/share?ref_src=twsrc%5Etfw'
        className='twitter-share-button'
        data-size='large'
        data-hashtags={hashtags
          .map((hashtag) => hashtag.replace(/[\s.-]+/g, ''))
          .slice(0, 5)
          .join(',')}
        data-show-count='true'
      />
    </>
  );
};
