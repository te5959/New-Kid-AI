import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import { authRoutes } from "./routes/authRoutes.js";
import { childRoutes } from "./routes/childRoutes.js";
import { lessonRoutes } from "./routes/lessonRoutes.js";
import { gamificationRoutes } from "./routes/gamificationRoutes.js";
import { playgroundRoutes } from "./routes/playgroundRoutes.js";
import { parentRoutes } from "./routes/parentRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

  app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "ok", uptime: process.uptime(), version: env.APP_VERSION });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/children", childRoutes);
  app.use("/api", lessonRoutes);
  app.use("/api", gamificationRoutes);
  app.use("/api/ai", playgroundRoutes);
  app.use("/api/parents", parentRoutes);

  app.use(errorHandler);

  return app;
};
