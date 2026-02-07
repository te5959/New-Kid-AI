import { learningPaths, lessons } from "../data/lessons.js";

export const listLearningPaths = (age) => {
  return learningPaths
    .filter((path) => age >= path.minAge && age <= path.maxAge)
    .sort((a, b) => a.sortOrder - b.sortOrder);
};

export const listLessonsForPath = (pathId, age) => {
  return lessons
    .filter(
      (lesson) =>
        lesson.learningPathId === pathId && age >= lesson.minAge && age <= lesson.maxAge
    )
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      summary: lesson.summary,
      sortOrder: lesson.sortOrder
    }));
};

export const getLesson = (lessonId) => {
  return lessons.find((lesson) => lesson.id === lessonId) || null;
};
