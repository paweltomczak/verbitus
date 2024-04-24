import { Theme } from './interfaces';

export function removeHTMLTags(htmlString: string) {
  return htmlString.replace(/<[^>]*>/g, '');
}

export const extractFirstParagraph = (htmlContent: string): string => {
  const match = htmlContent.match(/<p>(.*?)<\/p>/is);
  return match ? match[1].replace(/<[^>]*>/g, '').trim() : '';
};

export const stringToURL = (string: string) => {
  return string
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const urlToString = (url: string) => {
  return url
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const setThemeCookie = (theme: Theme) => {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
};
