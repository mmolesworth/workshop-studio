import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'workshop-progress';

const ProgressContext = createContext(null);

export function ProgressProvider({ workshopId, children }) {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed[workshopId] || { completedLessons: [], lastVisited: null };
    }
    return { completedLessons: [], lastVisited: null };
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const allProgress = saved ? JSON.parse(saved) : {};
    allProgress[workshopId] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  }, [workshopId, progress]);

  const markComplete = useCallback((lessonId) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId]
      };
    });
  }, []);

  const markIncomplete = useCallback((lessonId) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.filter(id => id !== lessonId)
    }));
  }, []);

  const isComplete = useCallback((lessonId) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const setLastVisited = useCallback((lessonId) => {
    setProgress(prev => {
      if (prev.lastVisited === lessonId) {
        return prev; // No change needed
      }
      return {
        ...prev,
        lastVisited: lessonId
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ completedLessons: [], lastVisited: null });
    }, []);

  const value = {
    progress,
    markComplete,
    markIncomplete,
    isComplete,
    setLastVisited,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
