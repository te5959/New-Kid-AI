import { Response } from "express";
import { AuthedRequest } from "../middlewares/auth.js";
import { getProgressSummary, getXpSummary } from "../services/gamificationService.js";
import { prisma } from "../config/prisma.js";

export const getProgress = async (req: AuthedRequest, res: Response) => {
  const summary = await getProgressSummary(req.params.childId);
  return res.json(summary);
};

export const getXp = async (req: AuthedRequest, res: Response) => {
  const summary = await getXpSummary(req.params.childId);
  return res.json(summary);
};

export const getBadges = async (req: AuthedRequest, res: Response) => {
  const badges = await prisma.childBadge.findMany({
    where: { childId: req.params.childId },
    include: { badge: true }
  });
  return res.json(badges.map((entry) => ({
    code: entry.badge.code,
    title: entry.badge.title,
    description: entry.badge.description,
    icon: entry.badge.icon,
    earnedAt: entry.earnedAt
  })));
};

export const getStreak = async (req: AuthedRequest, res: Response) => {
  const streak = await prisma.streak.findUnique({ where: { childId: req.params.childId } });
  if (!streak) {
    return res.json({ currentDays: 0, longestDays: 0, lastActivityDate: null });
  }
  return res.json({
    currentDays: streak.currentDays,
    longestDays: streak.longestDays,
    lastActivityDate: streak.lastActivityDate
  });
};
