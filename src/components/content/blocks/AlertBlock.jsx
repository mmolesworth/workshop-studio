import Alert from '@cloudscape-design/components/alert';

/**
 * Renders a Cloudscape Alert component.
 * 
 * @param {object} props
 * @param {string} props.alertType - One of: info, warning, error, success
 * @param {string} [props.header] - Optional header text
 * @param {string} props.content - Alert body content
 */
export function AlertBlock({ alertType, header, content }) {
    return (
        <Alert
          type={alertType}
          header={header}
        >
            {content}
        </Alert>
    );
}
