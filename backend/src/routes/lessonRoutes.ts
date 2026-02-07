import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { enforceScreenTime } from "../middlewares/screenTime.js";
import { requireChildOwnership } from "../middlewares/ownership.js";
import { getLearningPaths, getLessonsForPath, getLessonDetail, completeLesson } from "../controllers/lessonController.js";

export const lessonRoutes = Router();

lessonRoutes.use(requireAuth);
lessonRoutes.get("/learning-paths", getLearningPaths);
lessonRoutes.get("/learning-paths/:pathId/lessons", getLessonsForPath);
lessonRoutes.get("/lessons/:lessonId", getLessonDetail);
lessonRoutes.post("/lessons/:lessonId/complete", requireChildOwnership, enforceScreenTime(10), completeLesson);
