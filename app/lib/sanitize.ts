import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeHTML = (input: string) => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

const removeURLs = (input: string) => {
  const urlPattern = /(?:https?:\/\/|www\.|[\w-]+\.[a-z]{2,})([^\s]*)/gi;
  if (urlPattern.test(input)) {
    return '';
  }
  return input;
};

export const sanitizeInput = (input: string) => {
  const sanitized = sanitizeHTML(input);
  return removeURLs(sanitized);
};
