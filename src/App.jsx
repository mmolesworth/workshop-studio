import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
    AppLayout,
    Icon,
    SideNavigation,
    TopNavigation,
    Link
} from '@cloudscape-design/components';

import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import { workshop } from './data/workshop';
import { useProgress } from './context/ProgressContext';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { useState } from 'react';
import { ContentTest } from './components/ContentTest';

// Switch to dark mode
applyMode(Mode.Dark);

// Switch to light mode
applyMode(Mode.Light);

function App() {
    
    const navigate = useNavigate();
    const location = useLocation();
    const { isComplete } = useProgress();

    const navigationItems = [
    {
      type: 'link',
      text: 'Workshop Home',
      href: '/'
    },
    { type: 'divider' },
   ...workshop.chapters.map(chapter => ({
        type: 'section',
        text: chapter.title,
        items: chapter.lessons.map(lesson => {
            const lessonKey = `${chapter.id}-${lesson.id}`;
            const completed = isComplete(lessonKey);

            return {
                type: 'link',
                text: lesson.title,
                href: `/lesson/${chapter.id}/${lesson.id}`,
                info: completed ? <Icon name="status-positive" variant="success" /> : null
            }
        })
   }))
  ];



  const handleNavigationClick = (event) => {
    event.preventDefault();
    navigate(event.detail.href);
  }

    console.log('workshop:', workshop);
    console.log('workshop.title:', workshop?.title);

    return (
        <>
            <div id="top-nav" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
                <TopNavigation
                    identity={{
                        href: "#/",
                        title: "Agiliko Workshop Studio",
                        logo: { src: "/agiliko-logo.png", alt: "Agiliko Workshop Studio" }  // optional
                    }}
                    utilities={[
                        // Optional utility items on the right side
                        {
                            type: "button",
                            text: "GitHub",
                            href: "https://github.com/mmolesworth/workshop-studio",
                            external: true
                        },
                        {                        
                            type: "button",
                            text: "Agiliko",
                            href: "https://agiliko.com",
                            external: true
                        },
                        {
                            type: "menu-dropdown",
                            text: "Settings",
                            items: [
                                { id: "preferences", text: "Preferences" },
                                { id: "signout", text: "Sign out" }
                            ]
                        },
                    ]}
                />
                </div> 
                <AppLayout 
                    navigation={
                            <SideNavigation
                                header={{ href: "#/", text: workshop.title }} 
                                items={navigationItems}
                                activeHref={location.pathname}
                                onFollow={handleNavigationClick}
                            />

                    }
                    content={
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/lesson/:chapterId/:lessonId" element={<LessonPage />} />
                            <Route path="/test" element={ <ContentTest />} />
                        </Routes>
                    }
                    toolsHide={true}
                />       
        </>
    );
}

export default App;