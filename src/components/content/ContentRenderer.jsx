import { TextBlock, 
         AlertBlock, 
         DividerBlock, 
         CodeBlock, 
         StepsBlock, 
         ExpandableBlock, 
         ImageBlock,
         VideoBlock, 
         TableBlock,
         QuizBlock } from "./blocks";
import Box from '@cloudscape-design/components/box';

/**
 * Maps block type string to their React components.
 * Add new block types here as they're needed.
 */
const blockComponents = {
    text: TextBlock,
    alert: AlertBlock,
    divider: DividerBlock,
    code: CodeBlock,
    steps: StepsBlock,
    expandable: ExpandableBlock,
    image: ImageBlock,
    video: VideoBlock,
    table: TableBlock,
    quiz: QuizBlock,
}

/**
 * Renders an array of content blocks as Cloudscape components.
 * 
 * @param {object} props
 * @param {Array} props.content - Array of content block objects from YAML
 */
export function ContentRenderer({ content }) {
    //Guard against missing or empty content
    if(!content || content.length === 0) {
    return (
        <Box color="text-status-inactive">
            No content available.
        </Box>
    );
    }
  
    // Function to render nested content (passed to blocks that need it)
    const renderNestedContent = (nestedContent) => {
        return <ContentRenderer content={nestedContent} />;
    };

    return (
        <div className="content-renderer">
            {content.map((block, index) => {
                // Look up the component for this block type
                const BlockComponent = blockComponents[block.type];

                // Handle unknown block types gracefully
                if (!BlockComponent) {
                    console.warn(`Unknown block type: ${block.type}`);
                    return (
                        <Box
                          key={index}
                          color="text-status-warning"
                          padding={{ vertical: 's' }}
                        >
                          Unknown block type: {block.type}
                        </Box>
                    );
                }

                // Render the block with spacing
                return (
                    <Box key={index} padding={{ bottom: 'm' }}>
                        <BlockComponent {...block} renderContent={renderNestedContent} />
                    </Box>
                );
            })}
        </div>
    );
}