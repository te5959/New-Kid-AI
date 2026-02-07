import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getLearningPaths, getLessonsForPath, getLessonDetail, completeLesson } from "../controllers/learning-controller.js";

export const learningRouter = Router();

learningRouter.use(requireAuth);
learningRouter.get("/learning-paths", getLearningPaths);
learningRouter.get("/learning-paths/:id/lessons", getLessonsForPath);
learningRouter.get("/lessons/:id", getLessonDetail);
learningRouter.post("/lessons/:id/complete", completeLesson);
