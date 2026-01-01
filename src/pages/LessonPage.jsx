import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  ContentLayout,
  Header,
  Alert,
  SpaceBetween,
  Icon,
  Button,
  BreadcrumbGroup,
  Container
} from '@cloudscape-design/components';

import { workshop } from '../data/workshop';
import { useProgress } from '../context/ProgressContext';

function getAllLessons() {
  const lessons = [];
  for (const chapter of workshop.chapters) {
    for (const lesson of chapter.lessons) {
      lessons.push({
        chapterId: chapter.id,
        lessonId: lesson.id,
        chapterTitle: chapter.title,
        lessonTitle: lesson.title,
        content: lesson.content
      });
    }
  }
  return lessons;
}

function LessonPage() {
  const { chapterId, lessonId } = useParams();
  const navigate = useNavigate();
  const { isComplete, markComplete, setLastVisited } = useProgress();

  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(
    l => l.chapterId === chapterId && l.lessonId === lessonId
  );

  const currentLesson = allLessons[currentIndex];
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const lessonKey = `${chapterId}-${lessonId}`;

  const handleBreadcrumbClick = (event) => {
    event.preventDefault();
    navigate(event.detail.href.replace('#', ''));
  };

  useEffect(() => {
    setLastVisited(lessonKey);
  }, [lessonKey, setLastVisited]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom < 50) {
        markComplete(lessonKey);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lessonKey, markComplete]);

  if (!currentLesson) {
    return (
      <ContentLayout header={<Header variant="h1">Not Found</Header>}>
        <Alert type="error">
          Lesson not found. Please select a lesson from the sidebar.
        </Alert>
      </ContentLayout>
    );
  }

  const handleNext = () => {
    navigate(`/lesson/${nextLesson.chapterId}/${nextLesson.lessonId}`);
  };

  return (
    <SpaceBetween size="l">
        <BreadcrumbGroup
            items={[
                { text: "Home", href: "#/" },
                { text: `${currentLesson.chapterTitle}`, href: `#/lesson/${chapterId}/1` },
                { text: `${currentLesson.lessonTitle}`, href: "#" }
            ]}
            onFollow={handleBreadcrumbClick}
        />
        <Container header={<Header variant="h2">{currentLesson.lessonTitle}</Header>}>
          <SpaceBetween size="m">
            <p>{workshop.description}</p>
          </SpaceBetween>
        </Container>

        <Header variant="h1">
            
        </Header>
          

        <hr />
        <ContentLayout>
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentLesson.content}
            </ReactMarkdown>
          </div>
        </ContentLayout>

        {nextLesson && (
          <Button
            variant="primary"
            fullWidth
            onClick={handleNext}
          >
            <SpaceBetween direction="vertical" size="xxxs" alignItems="center">
              <span>{nextLesson.lessonTitle}</span>
              <Icon name="angle-down" />
            </SpaceBetween>
          </Button>
        )}
    </SpaceBetween>
    );
}

export default LessonPage;