import yaml from "js-yaml";

// Simple in-memory cache to avoid re-fethcing
const cache = new Map();

/**
 * Fetches a YAML file and parses it to a JavaScript object.
 * Results are cached to avoid redundant network requests.
 *
 * @param {string} path - Path relative to public/content
 * @returns {Promise<object>} Parsed YAML content
 */

async function fetchYaml(path) {
  // Check cache first
  if (cache.has(path)) {
    return cache.get(path);
  }

  // Build the full URL - files in public/ are served at root
  const url = `/content/${path}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.statusText}`);
  }

  const text = await response.text();
  const parsed = yaml.load(text);

  cache.set(path, parsed);

  return parsed;
}

/**
 * Loads the workshp index (list of all available workshops)
 */
export async function loadWorkshopIndex() {
  return fetchYaml("index.yaml");
}

/**
 * Loads a workshop's metadata and chapter references
 * @param {string} workshopId - e.g., 'intro-to-serverless'
 */
export async function loadWorkshop(workshopId) {
  return fetchYaml(`${workshopId}/workshop.yaml`);
}

/**
 * Loads a chapter's metadata and lesson references
 * @param {string} workshopId - e.g., 'intro-to-serverless'
 * @param {string} chapterId - e.g., 'getting started'
 */
export async function loadChapter(workshopId, chapterId) {
  return fetchYaml(`${workshopId}/chapters/${chapterId}/chapter.yaml`);
}

/**
 * Loads a lesson's full content including all content blocks
 * @param {string} workshopId - e.g., 'intro-to-serverless'
 * @param {string} chapterId - e.g., 'getting-started'
 * @param {string} lessonId - e.g., 'mabda-basics'
 */
export async function loadLesson(workshopId, chapterId, lessonId) {
  return fetchYaml(
    `${workshopId}/chapters/${chapterId}/lessons/${lessonId}.yaml`,
  );
}

/**
 * Loads the complete workshop structure for navigation.
 * Returns workshop metadata with chapters and their lessons.
 *
 * @param {string} workshopId
 * @returns {Promise<object>} Workshop with nested chapters and lessons
 */
export async function loadWorkshopWithStructure(workshopId) {
  const workshop = await loadWorkshop(workshopId);

  // Load all chapters in parallel
  const chaptersWithLessons = await Promise.all(
    workshop.chapters.map(async (chapterRef) => {
      const chapter = await loadChapter(workshopId, chapterRef.id);
      return {
        ...chapter,
        // Lessons are references for now - full content loaded on demand
        lessons: chapter.lessons.map((lessonRef) => ({
          id: lessonRef.id,
          // We don't load lesson content here - just the reference
        })),
      };
    }),
  );

  return {
    ...workshop,
    chapters: chaptersWithLessons,
  };
}

/**
 * Clears trhe content cache. Useful for development of
 * when content is known to have changed.
 */
export function clearContentCache() {
  cache.clear();
}
