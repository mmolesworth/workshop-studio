import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Markdown from 'react-markdown';

/**
 * Renders step-by-step instructions as numbered items.
 * 
 * @param {object} props
 * @param {string} [props.title] - Optional header above the steps
 * @param {Array} props.steps - Array of step objects with title and description
 */
export function StepsBlock({ title, steps }) {
  // Guard against missing steps
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <Box>
      {title && (
        <Box variant="h3" padding={{ bottom: 's' }}>
          {title}
        </Box>
      )}
      <SpaceBetween size="m">
        {steps.map((step, index) => (
          <Box key={index}>
            <Box variant="h4" padding={{ bottom: 'xxs' }}>
              Step {index + 1}: {step.title}
            </Box>
            <Box padding={{ left: 'l' }}>
              <Markdown>{step.description}</Markdown>
            </Box>
          </Box>
        ))}
      </SpaceBetween>
    </Box>
  );
}