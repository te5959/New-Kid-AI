import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../middlewares/auth.js";
import { enforceScreenTime } from "../middlewares/screenTime.js";
import { getDatasets, train, predict, chatbot } from "../controllers/playgroundController.js";

export const playgroundRoutes = Router();

playgroundRoutes.use(requireAuth);
playgroundRoutes.use(rateLimit({ windowMs: 60 * 1000, max: 30 }));
playgroundRoutes.get("/datasets", getDatasets);
playgroundRoutes.post("/train", enforceScreenTime(5), train);
playgroundRoutes.post("/predict", predict);
playgroundRoutes.get("/chatbot", chatbot);
