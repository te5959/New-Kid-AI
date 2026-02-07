import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import { createChildProfile, listChildProfiles, getChildProfile, setScreenTimeLimit } from "../controllers/childController.js";

export const childRoutes = Router();

childRoutes.use(requireAuth);
childRoutes.post("/", createChildProfile);
childRoutes.get("/", listChildProfiles);
childRoutes.get("/:childId", getChildProfile);
childRoutes.post("/:childId/limits", setScreenTimeLimit);
