export function removeHTMLTags(htmlString: string) {
  return htmlString.replace(/<[^>]*>/g, '');
}

export const extractFirstParagraph = (htmlContent: string): string => {
  const match = htmlContent.match(/<p>(.*?)<\/p>/is);
  return match ? match[1].replace(/<[^>]*>/g, '').trim() : '';
};

export const categoryToURL = (category: string) => {
  return category
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const urlToCategory = (url: string) => {
  return url
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
