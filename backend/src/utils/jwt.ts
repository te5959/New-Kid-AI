import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signAccessToken = (parentId: string) => {
  return jwt.sign({ sub: parentId, role: "parent" }, env.JWT_SECRET, { expiresIn: "15m" });
};

export const signRefreshToken = (parentId: string) => {
  return jwt.sign({ sub: parentId, type: "refresh" }, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as { sub: string; role: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string; type: string };
};
