import Box from '@cloudscape-design/components/box';

/**
 * Renders a horizontal divider line.
 */
export function DividerBlock() {
    return (
        <Box padding={{ vertical: 'm' }}>
            <hr style={{
                border: 'none',
                borderTop: '1px solid #e9ebed'
            }} />
        </Box>
    );
}