import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { getParentProfile, getParentDashboard, listApprovals, approveLesson } from "../controllers/parentController.js";

export const parentRoutes = Router();

parentRoutes.use(requireAuth);
parentRoutes.get("/me", getParentProfile);
parentRoutes.get("/dashboard", getParentDashboard);
parentRoutes.get("/approvals", listApprovals);
parentRoutes.post("/approve", approveLesson);
