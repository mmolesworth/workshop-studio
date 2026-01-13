import { useState, useEffect } from "react";
import { loadWorkshopWithStructure } from "../services/contentService";

/**
 * Hook to load workshop metadata and structure (chapters + lesson lists).
 * Used for navigation and workshop overview.
 *
 * @param {string} workshopId
 * @returns {{ workshop: object|null, loading: boolean, error: Error|null }}
 */
export function useWorkshop(workshopId) {
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!workshopId) {
      setLoading(false);
      return;
    }

    loadWorkshopWithStructure(workshopId)
      .then((data) => {
        setWorkshop(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [workshopId]);

  return { workshop, loading, error };
}
