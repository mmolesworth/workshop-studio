import { CodeView } from '@cloudscape-design/code-view';
import javascript from '@cloudscape-design/code-view/highlight/javascript';
import python from '@cloudscape-design/code-view/highlight/python';
import sh from '@cloudscape-design/code-view/highlight/sh';
import json from '@cloudscape-design/code-view/highlight/json';
import yaml from '@cloudscape-design/code-view/highlight/yaml';
import typescript from '@cloudscape-design/code-view/highlight/typescript';
import csharp from '@cloudscape-design/code-view/highlight/csharp';
import Box from '@cloudscape-design/components/box';

/**
 * Map of language names to Cloudscape highlight definitions.
 * Add more languages here as needed.
 */
const languageMap = {
  javascript: javascript,
  js: javascript,
  python: python,
  py: python,
  bash: sh,
  shell: sh,
  sh: sh,
  json: json,
  yaml: yaml,
  yml: yaml,
  typescript: typescript,
  ts: typescript,
  csharp: csharp,
  'c#': csharp,
  cs: csharp,
};

/**
 * Renders a code block with syntax highlighting.
 * 
 * @param {object} props
 * @param {string} props.language - Programming language for highlighting
 * @param {string} [props.title] - Optional title displayed above code
 * @param {string} props.code - The code content to display
 */
export function CodeBlock({ language, title, code }) {
  // Guard against missing code
  if (!code) {
    return null;
  }

  // Look up the Cloudscape highlight definition
  const highlighting = languageMap[language?.toLowerCase()];

  return (
    <Box>
      {title && (
        <Box variant="code" fontWeight="bold" padding={{ bottom: 'xs' }}>
          {title}
        </Box>
      )}
      <CodeView
        content={code}
        highlight={highlighting}
      />
    </Box>
  );
}