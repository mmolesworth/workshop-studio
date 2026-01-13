import ExpandableSection from '@cloudscape-design/components/expandable-section';

/**
 * Renders a collapsible section using Cloudscape's ExpandableSection.
 * Content blocks inside are rendered using the ContentRenderer.
 * 
 * @param {object} props
 * @param {string} props.header - The clickable header text
 * @param {boolean} [props.defaultExpanded=false] - Whether to start expanded
 * @param {Array} props.content - Array of nested content blocks
 * @param {React.ComponentType} props.renderContent - Function to render nested content
 */
export function ExpandableBlock({ header, defaultExpanded = false, content, renderContent }) {
  return (
    <ExpandableSection
      headerText={header}
      defaultExpanded={defaultExpanded}
    >
      {renderContent && content ? renderContent(content) : null}
    </ExpandableSection>
  );
}