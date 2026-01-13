import { useLesson } from '../hooks';
import { ContentRenderer } from './content';
import Header from '@cloudscape-design/components/header';
import Spinner from '@cloudscape-design/components/spinner';
import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { DividerBlock } from './content/blocks';

export function ContentTest() {
  const { lesson, loading, error } = useLesson(
    'sample-workshop',
    'getting-started',
    'first-steps'
  );

  if (loading) {
    return (
      <Box padding="xxl" textAlign="center">
        <Spinner size="large" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert type="error" header="Error loading lesson">
        {error.message}
      </Alert>
    );
  }

  return (
    <SpaceBetween size="l">
      <Header variant="h1" description={lesson.description}>
        {lesson.title}
      </Header>
      <DividerBlock />
      <ContentRenderer content={lesson.content} />
    </SpaceBetween>
  );
}