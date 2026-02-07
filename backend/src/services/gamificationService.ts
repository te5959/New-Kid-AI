import { prisma } from "../config/prisma.js";

const levelThresholds = [0, 50, 120, 200, 300, 420, 560];

export const recordLessonCompletion = async (childId: string, lessonId: string, score: number) => {
  const result = await prisma.progress.upsert({
    where: { childId_lessonId: { childId, lessonId } },
    update: { status: "completed", score, completedAt: new Date() },
    create: { childId, lessonId, status: "completed", score, completedAt: new Date() }
  });
  const xpPoints = Math.max(10, Math.round(score * 0.5));
  await prisma.xpEvent.create({
    data: { childId, source: `lesson:${lessonId}`, points: xpPoints }
  });
  await updateStreak(childId);
  return { progressId: result.id, xpAwarded: xpPoints, score };
};

export const getXpSummary = async (childId: string) => {
  const total = await prisma.xpEvent.aggregate({
    where: { childId },
    _sum: { points: true }
  });
  const totalXp = total._sum.points ?? 0;
  const level = levelThresholds.filter((threshold) => totalXp >= threshold).length;
  const nextThreshold = levelThresholds[level] || levelThresholds[levelThresholds.length - 1];
  return { totalXp, level, nextThreshold };
};

export const getProgressSummary = async (childId: string) => {
  const progress = await prisma.progress.groupBy({
    by: ["status"],
    where: { childId },
    _count: { status: true }
  });
  return progress.reduce(
    (acc, item) => ({ ...acc, [item.status]: item._count.status }),
    { locked: 0, in_progress: 0, completed: 0 }
  );
};

export const updateStreak = async (childId: string) => {
  const today = new Date();
  const streak = await prisma.streak.findUnique({ where: { childId } });
  if (!streak) {
    await prisma.streak.create({
      data: { childId, currentDays: 1, longestDays: 1, lastActivityDate: today }
    });
    return;
  }
  const last = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null;
  const isYesterday = last && new Date(today.getTime() - 86400000).toDateString() === last.toDateString();
  const isToday = last && last.toDateString() === today.toDateString();
  let currentDays = streak.currentDays;
  if (isYesterday) {
    currentDays += 1;
  } else if (!isToday) {
    currentDays = 1;
  }
  const longestDays = Math.max(streak.longestDays, currentDays);
  await prisma.streak.update({
    where: { childId },
    data: { currentDays, longestDays, lastActivityDate: today }
  });
};
