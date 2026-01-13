import Box from '@cloudscape-design/components/box';

/**
 * Parses aspect ratio string (e.g., "16:9") into a percentage for padding trick.
 * @param {string} ratio - Aspect ratio like "16:9" or "4:3"
 * @returns {number} Percentage for padding-bottom
 */
function getAspectRatioPercent(ratio) {
  if (!ratio) return 56.25; // Default 16:9
  
  const [width, height] = ratio.split(':').map(Number);
  if (!width || !height) return 56.25;
  
  return (height / width) * 100;
}

/**
 * Renders an embedded video player.
 * 
 * @param {object} props
 * @param {string} props.src - Video embed URL (YouTube, Vimeo, etc.)
 * @param {string} props.title - Title for accessibility
 * @param {string} [props.aspectRatio="16:9"] - Aspect ratio like "16:9" or "4:3"
 */
export function VideoBlock({ src, title, aspectRatio = '16:9' }) {
  // Guard against missing src
  if (!src) {
    return null;
  }

  const paddingPercent = getAspectRatioPercent(aspectRatio);

  return (
    <Box>
      {title && (
        <Box
          variant="h4"
          padding={{ bottom: 'xs' }}
        >
          {title}
        </Box>
      )}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${paddingPercent}%`,
          height: 0,
          overflow: 'hidden',
        }}
      >
        <iframe
          src={src}
          title={title || 'Embedded video'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Box>
  );
}