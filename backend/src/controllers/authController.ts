import { Request, Response } from "express";
import { registerParent, loginParent, issueTokens, rotateRefreshToken, revokeRefreshToken } from "../services/authService.js";
import { registerSchema, loginSchema, refreshSchema } from "../validators/authValidators.js";

export const register = async (req: Request, res: Response) => {
  const payload = registerSchema.parse(req.body);
  try {
    const parent = await registerParent(payload);
    const tokens = await issueTokens(parent.id);
    return res.status(201).json({
      parent: { id: parent.id, email: parent.email, displayName: parent.displayName },
      ...tokens
    });
  } catch (error) {
    return res.status(409).json({ error: "Email already registered." });
  }
};

export const login = async (req: Request, res: Response) => {
  const payload = loginSchema.parse(req.body);
  const parent = await loginParent(payload);
  if (!parent) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  const tokens = await issueTokens(parent.id);
  return res.json({
    parent: { id: parent.id, email: parent.email, displayName: parent.displayName },
    ...tokens
  });
};

export const refresh = async (req: Request, res: Response) => {
  const payload = refreshSchema.parse(req.body);
  const tokens = await rotateRefreshToken(payload.refreshToken);
  if (!tokens) {
    return res.status(401).json({ error: "Invalid refresh token." });
  }
  return res.json(tokens);
};

export const logout = async (req: Request, res: Response) => {
  const payload = refreshSchema.parse(req.body);
  const revoked = await revokeRefreshToken(payload.refreshToken);
  if (!revoked) {
    return res.status(400).json({ error: "Refresh token not found." });
  }
  return res.status(204).send();
};
