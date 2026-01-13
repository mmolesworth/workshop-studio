import Markdown from 'react-markdown';
import TextContent from '@cloudscape-design/components/text-content';
import Link from '@cloudscape-design/components/link';

/**
 * Checks if a URL is external (different domain).
 * @param {string} href - The URL to check
 * @returns {boolean} True if external
 */
function isExternalLink(href) {
  if (!href) return false;
  
  // Relative links are internal
  if (href.startsWith('/') || href.startsWith('#')) {
    return false;
  }
  
  // Check if it's a full URL to a different domain
  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Custom components for react-markdown to use Cloudscape styling.
 */
const markdownComponents = {
  a: ({ href, children }) => (
    <Link
      href={href}
      external={isExternalLink(href)}
      target={isExternalLink(href) ? '_blank' : undefined}
    >
      {children}
    </Link>
  ),
};

/**
 * Renders markdown content using Cloudscape's TextContent component.
 * Links are rendered as Cloudscape Link components.
 * 
 * @param {object} props
 * @param {string} props.markdown - Markdown string to render
 */
export function TextBlock({ markdown }) {
  // Guard against missing content
  if (!markdown) {
    return null;
  }

  return (
    <TextContent>
      <Markdown components={markdownComponents}>{markdown}</Markdown>
    </TextContent>
  );
}