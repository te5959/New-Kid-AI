import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const SALT_ROUNDS = 12;

export const registerParent = async (payload: {
  email: string;
  password: string;
  displayName: string;
}) => {
  const existing = await prisma.parent.findUnique({ where: { email: payload.email } });
  if (existing) {
    throw new Error("Email already registered");
  }
  const passwordHash = await bcrypt.hash(payload.password, SALT_ROUNDS);
  return prisma.parent.create({
    data: {
      email: payload.email,
      passwordHash,
      displayName: payload.displayName,
      consentedAt: new Date()
    }
  });
};

export const loginParent = async (payload: { email: string; password: string }) => {
  const parent = await prisma.parent.findUnique({ where: { email: payload.email } });
  if (!parent) {
    return null;
  }
  const valid = await bcrypt.compare(payload.password, parent.passwordHash);
  if (!valid) {
    return null;
  }
  return parent;
};

export const issueTokens = async (parentId: string) => {
  const accessToken = signAccessToken(parentId);
  const refreshToken = signRefreshToken(parentId);
  const tokenHash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
  await prisma.refreshToken.create({
    data: {
      parentId,
      tokenHash,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });
  return { accessToken, refreshToken };
};

export const rotateRefreshToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  const tokens = await prisma.refreshToken.findMany({
    where: { parentId: payload.sub, revokedAt: null }
  });
  const match = await Promise.all(
    tokens.map(async (token) => ((await bcrypt.compare(refreshToken, token.tokenHash)) ? token : null))
  );
  const valid = match.find(Boolean);
  if (!valid) {
    return null;
  }
  await prisma.refreshToken.update({
    where: { id: valid.id },
    data: { revokedAt: new Date() }
  });
  return issueTokens(payload.sub);
};

export const revokeRefreshToken = async (refreshToken: string) => {
  const payload = verifyRefreshToken(refreshToken);
  const tokens = await prisma.refreshToken.findMany({
    where: { parentId: payload.sub, revokedAt: null }
  });
  const match = await Promise.all(
    tokens.map(async (token) => ((await bcrypt.compare(refreshToken, token.tokenHash)) ? token : null))
  );
  const valid = match.find(Boolean);
  if (!valid) {
    return false;
  }
  await prisma.refreshToken.update({
    where: { id: valid.id },
    data: { revokedAt: new Date() }
  });
  return true;
};
