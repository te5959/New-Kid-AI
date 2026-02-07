import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getParentProfile, getParentDashboard, setScreenTimeLimit } from "../controllers/parent-controller.js";

export const parentRouter = Router();

parentRouter.use(requireAuth);
parentRouter.get("/me", getParentProfile);
parentRouter.get("/dashboard", getParentDashboard);
parentRouter.post("/limits/:childId", setScreenTimeLimit);
