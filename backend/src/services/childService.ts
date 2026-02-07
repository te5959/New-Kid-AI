import { prisma } from "../config/prisma.js";

export const createChild = async (parentId: string, payload: { displayName: string; age: number }) => {
  return prisma.$transaction(async (tx) => {
    const child = await tx.child.create({
      data: {
        parentId,
        displayName: payload.displayName,
        age: payload.age
      }
    });
    const lessons = await tx.lesson.findMany({ select: { id: true } });
    if (lessons.length) {
      await tx.lessonApproval.createMany({
        data: lessons.map((lesson) => ({
          parentId,
          childId: child.id,
          lessonId: lesson.id,
          status: "pending"
        })),
        skipDuplicates: true
      });
    }
    return child;
  });
};

export const listChildren = async (parentId: string) => {
  return prisma.child.findMany({
    where: { parentId },
    orderBy: { createdAt: "asc" }
  });
};

export const updateScreenTime = async (childId: string, dailyMinutes: number) => {
  return prisma.screenTimeLimit.upsert({
    where: { childId },
    update: { dailyMinutes, updatedAt: new Date() },
    create: { childId, dailyMinutes }
  });
};
