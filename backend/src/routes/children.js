import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { createChildProfile, listChildProfiles, getChildProfile, updateChildProfile } from "../controllers/child-controller.js";

export const childRouter = Router();

childRouter.use(requireAuth);
childRouter.post("/", createChildProfile);
childRouter.get("/", listChildProfiles);
childRouter.get("/:id", getChildProfile);
childRouter.patch("/:id", updateChildProfile);
