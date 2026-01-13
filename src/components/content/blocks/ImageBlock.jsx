import Box from '@cloudscape-design/components/box';

/**
 * Renders an image with optional caption.
 * 
 * @param {object} props
 * @param {string} props.src - Image source URL or path
 * @param {string} props.alt - Alt text for accessibility (required)
 * @param {string} [props.caption] - Optional caption below image
 * @param {number} [props.width] - Optional width in pixels
 */
export function ImageBlock({ src, alt, caption, width }) {
  // Guard against missing src
  if (!src) {
    return null;
  }

  return (
    <Box textAlign="center">
      <img
        src={src}
        alt={alt || 'Image'}
        style={{
          maxWidth: '100%',
          width: width ? `${width}px` : 'auto',
          height: 'auto',
        }}
        loading="lazy"
      />
      {caption && (
        <Box
          color="text-body-secondary"
          fontSize="body-s"
          padding={{ top: 'xs' }}
        >
          {caption}
        </Box>
      )}
    </Box>
  );
}