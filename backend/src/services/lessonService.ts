import { prisma } from "../config/prisma.js";

export const listLearningPaths = async (age: number, page: number, pageSize: number) => {
  return prisma.learningPath.findMany({
    where: { minAge: { lte: age }, maxAge: { gte: age } },
    orderBy: { sortOrder: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize
  });
};

export const listLessonsForPath = async (
  learningPathId: string,
  age: number,
  page: number,
  pageSize: number,
  childId?: string
) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      learningPathId,
      minAge: { lte: age },
      maxAge: { gte: age }
    },
    orderBy: { sortOrder: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  if (!childId) {
    return lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      summary: lesson.summary,
      sortOrder: lesson.sortOrder
    }));
  }

  const approvals = await prisma.lessonApproval.findMany({
    where: { childId }
  });
  const progress = await prisma.progress.findMany({
    where: { childId }
  });

  return lessons.map((lesson) => {
    const approval = approvals.find((item) => item.lessonId === lesson.id);
    const progressEntry = progress.find((item) => item.lessonId === lesson.id);
    return {
      id: lesson.id,
      title: lesson.title,
      summary: lesson.summary,
      sortOrder: lesson.sortOrder,
      status: progressEntry?.status ?? (approval?.status === "approved" ? "ready" : "locked")
    };
  });
};

export const getLessonForChild = async (lessonId: string, childId: string) => {
  const child = await prisma.child.findUnique({ where: { id: childId } });
  if (!child) {
    return null;
  }
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      minAge: { lte: child.age },
      maxAge: { gte: child.age }
    }
  });
  if (!lesson) {
    return null;
  }
  const approval = await prisma.lessonApproval.findUnique({
    where: { childId_lessonId: { childId, lessonId } }
  });
  if (!approval || approval.status !== "approved") {
    return null;
  }
  return lesson;
};

export const getQuizForLesson = async (lessonId: string) => {
  const quiz = await prisma.quiz.findFirst({ where: { lessonId } });
  return quiz;
};
