import Table from '@cloudscape-design/components/table';
import Box from '@cloudscape-design/components/box';

/**
 * Renders a data table using Cloudscape's Table component.
 * 
 * @param {object} props
 * @param {string} [props.header] - Optional table title
 * @param {Array} props.columns - Column definitions with key and header
 * @param {Array} props.rows - Array of row objects
 */
export function TableBlock({ header, columns, rows }) {
  // Guard against missing data
  if (!columns || !rows || columns.length === 0) {
    return null;
  }

  // Transform our YAML columns to Cloudscape's expected format
  const columnDefinitions = columns.map((col) => ({
    id: col.key,
    header: col.header,
    cell: (item) => item[col.key] || '-',
  }));

  return (
    <Box>
      {header && (
        <Box variant="h3" padding={{ bottom: 's' }}>
          {header}
        </Box>
      )}
      <Table
        columnDefinitions={columnDefinitions}
        items={rows}
        variant="embedded"
        empty={
          <Box textAlign="center" color="text-body-secondary">
            NA
          </Box>
        }
      />
    </Box>
  );
}