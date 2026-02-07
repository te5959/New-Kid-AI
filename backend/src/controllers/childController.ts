import { Response } from "express";
import { prisma } from "../config/prisma.js";
import { AuthedRequest } from "../middlewares/auth.js";
import { childCreateSchema, screenTimeSchema } from "../validators/childValidators.js";
import { createChild, listChildren, updateScreenTime } from "../services/childService.js";

export const createChildProfile = async (req: AuthedRequest, res: Response) => {
  const payload = childCreateSchema.parse(req.body);
  const child = await createChild(req.user!.id, payload);
  return res.status(201).json(child);
};

export const listChildProfiles = async (req: AuthedRequest, res: Response) => {
  const children = await listChildren(req.user!.id);
  return res.json(children);
};

export const getChildProfile = async (req: AuthedRequest, res: Response) => {
  const child = await prisma.child.findFirst({
    where: { id: req.params.childId, parentId: req.user!.id }
  });
  if (!child) {
    return res.status(404).json({ error: "Child not found." });
  }
  return res.json(child);
};

export const setScreenTimeLimit = async (req: AuthedRequest, res: Response) => {
  const payload = screenTimeSchema.parse(req.body);
  const child = await prisma.child.findFirst({
    where: { id: req.params.childId, parentId: req.user!.id }
  });
  if (!child) {
    return res.status(404).json({ error: "Child not found." });
  }
  const limit = await updateScreenTime(child.id, payload.dailyMinutes);
  return res.json(limit);
};
