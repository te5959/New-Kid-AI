import { Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { AuthedRequest } from "./auth.js";

export const enforceScreenTime = (minutesToAdd: number) => {
  return async (req: AuthedRequest, res: Response, next: NextFunction) => {
    const childId = (req.body.childId || req.params.childId) as string | undefined;
    if (!childId) {
      return res.status(400).json({ error: "Missing childId." });
    }
    const limit = await prisma.screenTimeLimit.findUnique({ where: { childId } });
    if (!limit) {
      return next();
    }
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const total = await prisma.childActivity.aggregate({
      where: { childId, activityDate: { gte: todayStart } },
      _sum: { minutes: true }
    });
    const used = total._sum.minutes ?? 0;
    if (used + minutesToAdd > limit.dailyMinutes) {
      return res.status(403).json({ error: "Daily screen-time limit reached." });
    }
    await prisma.childActivity.create({
      data: { childId, minutes: minutesToAdd }
    });
    return next();
  };
};
