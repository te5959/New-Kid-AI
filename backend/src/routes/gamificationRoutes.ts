import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { requireChildOwnership } from "../middlewares/ownership.js";
import { getProgress, getXp, getBadges, getStreak } from "../controllers/gamificationController.js";

export const gamificationRoutes = Router();

gamificationRoutes.use(requireAuth);
gamificationRoutes.get("/children/:childId/progress", requireChildOwnership, getProgress);
gamificationRoutes.get("/children/:childId/xp", requireChildOwnership, getXp);
gamificationRoutes.get("/children/:childId/badges", requireChildOwnership, getBadges);
gamificationRoutes.get("/children/:childId/streak", requireChildOwnership, getStreak);
