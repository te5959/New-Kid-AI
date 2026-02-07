import { Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { AuthedRequest } from "./auth.js";

export const requireChildOwnership = async (
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) => {
  const childId = (req.params.childId || req.body.childId || req.query.childId) as string | undefined;
  if (!req.user?.id || !childId) {
    return res.status(400).json({ error: "Missing childId." });
  }
  const child = await prisma.child.findFirst({
    where: { id: childId, parentId: req.user.id }
  });
  if (!child) {
    return res.status(403).json({ error: "Not authorized for this child." });
  }
  return next();
};
