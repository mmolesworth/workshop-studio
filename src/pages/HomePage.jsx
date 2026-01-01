import { useNavigate } from 'react-router-dom';
import {
  ContentLayout,
  Header,
  Container,
  SpaceBetween,
  Button,
  Alert
} from '@cloudscape-design/components';

import { workshop } from '../data/workshop';
import { useProgress } from '../context/ProgressContext';

function HomePage() {
  const navigate = useNavigate();
  const { progress, isComplete, resetProgress } = useProgress();

  // Find the first incomplete lesson
  const findNextLesson = () => {
    for (const chapter of workshop.chapters) {
      for (const lesson of chapter.lessons) {
        const lessonKey = `${chapter.id}-${lesson.id}`;
        if (!isComplete(lessonKey)) {
          return { chapterId: chapter.id, lessonId: lesson.id };
        }
      }
    }
    return null; // All complete
  };

  const nextLesson = findNextLesson();

  const handleResume = () => {
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.chapterId}/${nextLesson.lessonId}`);
    }
  };

    const handleStart = () => {
    resetProgress();
    const firstChapter = workshop.chapters[0];
    const firstLesson = firstChapter.lessons[0];
    navigate(`/lesson/${firstChapter.id}/${firstLesson.id}`);
    };

  // Check if user has started (has any progress)
  const hasStarted = progress.completedLessons.length > 0;

  return (
    <ContentLayout
      header={<Header 
                variant="h1"
                actions= {
                  <SpaceBetween direction="horizontal" size="xs">
                    <Button variant="primary" onClick={handleStart}>
                      {hasStarted ? 'Start from beginning' : 'Get started'}
                    </Button>
                  </SpaceBetween>
                }
              >
                  {workshop.title}
              </Header>}
    >
      <SpaceBetween size="m">
        <hr />
        {hasStarted && nextLesson && (
          <Alert
            type="info"
            header="Welcome back!"
            action={
              <Button onClick={handleResume}>
                Continue where you left off
              </Button>
            }
          >
            You've completed {progress.completedLessons.length} lesson{progress.completedLessons.length !== 1 ? 's' : ''}.
          </Alert>
        )}

        {hasStarted && !nextLesson && (
          <Alert type="success" header="Congratulations!">
            You've completed all lessons in this workshop.
          </Alert>
        )}

        <Container 
          header={
            <Header variant="h2">
              About this workshop
            </Header>
          }
        >
          <SpaceBetween size="s">
            <p>{workshop.description}</p>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  );
}

export default HomePage;