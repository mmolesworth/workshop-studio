import { useState, useEffect } from "react";
import { loadLesson } from "../services/contentService";

/**
 * Hook to load lesson content
 *
 * @param {string} workshopId
 * @param {string} chapterId
 * @param {string} lessonId
 * @returns {{ lesson: object|null, loading:boolean, error: Error|null }}
 */

export function useLesson(workshopId, chapterId, lessonId) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when IDs change
    setLoading(true);
    setError(null);

    // Don't fetch if we don't ahve all required IDs
    if (!workshopId || !chapterId || !lessonId) {
      setLoading(false);
      return;
    }

    loadLesson(workshopId, chapterId, lessonId)
      .then((data) => {
        setLesson(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [workshopId, chapterId, lessonId]);

  return { lesson, loading, error };
}
