export function removeHTMLTags(htmlString: string) {
  return htmlString.replace(/<[^>]*>/g, '');
}
