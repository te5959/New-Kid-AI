import { Response } from "express";
import { AuthedRequest } from "../middlewares/auth.js";
import { prisma } from "../config/prisma.js";
import { approveLessonSchema } from "../validators/parentValidators.js";

export const getParentProfile = async (req: AuthedRequest, res: Response) => {
  const parent = await prisma.parent.findUnique({
    where: { id: req.user!.id },
    select: { id: true, email: true, displayName: true }
  });
  return res.json(parent);
};

export const getParentDashboard = async (req: AuthedRequest, res: Response) => {
  const children = await prisma.child.findMany({
    where: { parentId: req.user!.id },
    include: {
      progress: true,
      screenTime: true,
      xpEvents: true
    }
  });

  const summary = children.map((child) => ({
    id: child.id,
    displayName: child.displayName,
    age: child.age,
    lessonsCompleted: child.progress.filter((item) => item.status === "completed").length,
    dailyMinutes: child.screenTime?.dailyMinutes ?? 30,
    totalXp: child.xpEvents.reduce((sum, event) => sum + event.points, 0)
  }));

  return res.json({ children: summary });
};

export const listApprovals = async (req: AuthedRequest, res: Response) => {
  const approvals = await prisma.lessonApproval.findMany({
    where: { parentId: req.user!.id, status: "pending" },
    include: { lesson: true, child: true }
  });
  return res.json(approvals.map((approval) => ({
    id: approval.id,
    lessonId: approval.lessonId,
    lessonTitle: approval.lesson.title,
    childId: approval.childId,
    childName: approval.child.displayName
  })));
};

export const approveLesson = async (req: AuthedRequest, res: Response) => {
  const payload = approveLessonSchema.parse(req.body);
  const child = await prisma.child.findFirst({ where: { id: payload.childId, parentId: req.user!.id } });
  if (!child) {
    return res.status(404).json({ error: "Child not found." });
  }
  const approval = await prisma.lessonApproval.upsert({
    where: { childId_lessonId: { childId: payload.childId, lessonId: payload.lessonId } },
    update: { status: "approved" },
    create: { childId: payload.childId, lessonId: payload.lessonId, parentId: req.user!.id, status: "approved" }
  });
  return res.json(approval);
};
