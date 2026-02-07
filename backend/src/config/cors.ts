import { env } from "./env.js";

export const corsOptions = {
  origin: env.FRONTEND_URL,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
};
