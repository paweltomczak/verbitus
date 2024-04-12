export function removeHTMLTags(htmlString: string) {
  return htmlString.replace(/<[^>]*>/g, '');
}

export const extractFirstParagraph = (htmlContent: string): string => {
  const match = htmlContent.match(/<p>(.*?)<\/p>/is);
  return match ? match[1].replace(/<[^>]*>/g, '').trim() : '';
};
