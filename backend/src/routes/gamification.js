import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getChildProgress, getChildXp, getChildBadges, getChildStreak } from "../controllers/gamification-controller.js";

export const gamificationRouter = Router();

gamificationRouter.use(requireAuth);
gamificationRouter.get("/children/:id/progress", getChildProgress);
gamificationRouter.get("/children/:id/xp", getChildXp);
gamificationRouter.get("/children/:id/badges", getChildBadges);
gamificationRouter.get("/children/:id/streak", getChildStreak);
