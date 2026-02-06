import { listLearningPaths, listLessonsForPath, getLesson } from "../services/learning-service.js";
import { recordLessonCompletion, updateStreak } from "../services/gamification-service.js";

export const getLearningPaths = (req, res) => {
  const age = Number(req.query.age || 10);
  return res.json(listLearningPaths(age));
};

export const getLessonsForPath = (req, res) => {
  const age = Number(req.query.age || 10);
  return res.json(listLessonsForPath(req.params.id, age));
};

export const getLessonDetail = (req, res) => {
  const lesson = getLesson(req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: "Lesson not found." });
  }
  return res.json(lesson);
};

export const completeLesson = async (req, res, next) => {
  try {
    const { childId, score } = req.body;
    if (!childId) {
      return res.status(400).json({ error: "Missing childId." });
    }
    const result = await recordLessonCompletion({
      childId,
      lessonId: req.params.id,
      score: Number(score || 0)
    });
    await updateStreak(childId);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};
