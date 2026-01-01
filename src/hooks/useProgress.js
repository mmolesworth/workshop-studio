import { useState, useEffect } from "react";

const STORAGE_KEY = "workshop-progress";

export function useProgress(workshopId) {
  // Initialize state from localStorage
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed[workshopId] || { completedLessons: [] };
    }
    return { completedLessons: [] };
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const allProgress = saved ? JSON.parse(saved) : {};
    allProgress[workshopId] = progress;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  }, [workshopId, progress]);

  // Mark a lesson as complete
  const markComplete = (lessonId) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  // Mark a lesson as incomplete
  const markIncomplete = (lessonId) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.filter((id) => id !== lessonId),
    }));
  };

  // Check if a lesson is complete
  const isComplete = (lessonId) => {
    return progress.completedLessons.includes(lessonId);
  };

  return {
    progress,
    markComplete,
    markIncomplete,
    isComplete,
  };
}
