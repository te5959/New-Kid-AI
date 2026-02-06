import { registerParent, authenticateParent, createTokens, refreshAccessToken, revokeRefreshToken } from "../services/auth-service.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body;
    if (!email || !password || !displayName) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const parent = await registerParent({ email, password, displayName });
    const tokens = await createTokens(parent);
    return res.status(201).json({ parent, ...tokens });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const parent = await authenticateParent({ email, password });
    if (!parent) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const tokens = await createTokens(parent);
    return res.json({ parent, ...tokens });
  } catch (error) {
    return next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Missing refresh token." });
    }
    const tokens = await refreshAccessToken(refreshToken);
    if (!tokens) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }
    return res.json(tokens);
  } catch (error) {
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: "Missing refresh token." });
    }
    const revoked = await revokeRefreshToken(refreshToken);
    if (!revoked) {
      return res.status(400).json({ error: "Refresh token not found." });
    }
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};
