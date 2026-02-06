import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getDatasets, trainModel, predict, chatbot } from "../controllers/ai-controller.js";

export const aiRouter = Router();

aiRouter.use(requireAuth);
aiRouter.get("/datasets", getDatasets);
aiRouter.post("/train", trainModel);
aiRouter.post("/predict", predict);
aiRouter.get("/chatbot", chatbot);
