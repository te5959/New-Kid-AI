import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth.js";
import { parentRouter } from "./routes/parents.js";
import { childRouter } from "./routes/children.js";
import { learningRouter } from "./routes/learning.js";
import { gamificationRouter } from "./routes/gamification.js";
import { aiRouter } from "./routes/ai.js";
import { errorHandler } from "./middleware/error-handler.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
  app.use(express.json({ limit: "1mb" }));

  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 120,
      standardHeaders: true,
      legacyHeaders: false
    })
  );

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/parents", parentRouter);
  app.use("/api/children", childRouter);
  app.use("/api", learningRouter);
  app.use("/api", gamificationRouter);
  app.use("/api/ai", aiRouter);

  app.use(errorHandler);

  return app;
};
