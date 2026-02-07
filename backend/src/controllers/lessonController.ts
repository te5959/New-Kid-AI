import { Response } from "express";
import { AuthedRequest } from "../middlewares/auth.js";
import { paginationSchema, completeLessonSchema } from "../validators/lessonValidators.js";
import { listLearningPaths, listLessonsForPath, getLessonForChild, getQuizForLesson } from "../services/lessonService.js";
import { prisma } from "../config/prisma.js";
import { sanitizeContent } from "../utils/sanitize.js";
import { recordLessonCompletion } from "../services/gamificationService.js";

const computeScore = (quiz: any, answers: Array<{ questionId: string; answerIndex: number }>) => {
  const questions = quiz?.questions?.quiz || quiz?.questions?.questions || quiz?.questions?.content?.quiz;
  if (!Array.isArray(questions) || !questions.length) {
    return 0;
  }
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.answerIndex]));
  const correct = questions.filter((question: any) => answerMap.get(question.id) === question.answerIndex).length;
  return Math.round((correct / questions.length) * 100);
};

export const getLearningPaths = async (req: AuthedRequest, res: Response) => {
  const age = Number(req.query.age || 10);
  const { page, pageSize } = paginationSchema.parse(req.query);
  const paths = await listLearningPaths(age, page, pageSize);
  return res.json(paths);
};

export const getLessonsForPath = async (req: AuthedRequest, res: Response) => {
  const age = Number(req.query.age || 10);
  const { page, pageSize } = paginationSchema.parse(req.query);
  const childId = req.query.childId as string | undefined;
  if (childId) {
    const child = await prisma.child.findFirst({ where: { id: childId, parentId: req.user!.id } });
    if (!child) {
      return res.status(403).json({ error: "Not authorized for this child." });
    }
    const lessonsForApproval = await listLessonsForPath(req.params.pathId, age, page, pageSize);
    await prisma.lessonApproval.createMany({
      data: lessonsForApproval.map((lesson) => ({
        parentId: req.user!.id,
        childId,
        lessonId: lesson.id,
        status: "pending"
      })),
      skipDuplicates: true
    });
  }
  const lessons = await listLessonsForPath(req.params.pathId, age, page, pageSize, childId);
  return res.json(lessons);
};

export const getLessonDetail = async (req: AuthedRequest, res: Response) => {
  const childId = req.query.childId as string;
  if (!childId) {
    return res.status(400).json({ error: "Missing childId." });
  }
  const child = await prisma.child.findFirst({ where: { id: childId, parentId: req.user!.id } });
  if (!child) {
    return res.status(403).json({ error: "Not authorized for this child." });
  }
  const lesson = await getLessonForChild(req.params.lessonId, childId);
  if (!lesson) {
    return res.status(404).json({ error: "Lesson not available." });
  }
  return res.json({
    id: lesson.id,
    title: lesson.title,
    summary: lesson.summary,
    content: sanitizeContent(lesson.contentJson)
  });
};

export const completeLesson = async (req: AuthedRequest, res: Response) => {
  const payload = completeLessonSchema.parse(req.body);
  const child = await prisma.child.findFirst({ where: { id: payload.childId, parentId: req.user!.id } });
  if (!child) {
    return res.status(403).json({ error: "Not authorized for this child." });
  }
  const lesson = await getLessonForChild(req.params.lessonId, payload.childId);
  if (!lesson) {
    return res.status(404).json({ error: "Lesson not available." });
  }
  const quiz = await getQuizForLesson(lesson.id);
  const score = computeScore(quiz, payload.answers);
  const result = await recordLessonCompletion(payload.childId, lesson.id, score);
  return res.json(result);
};
