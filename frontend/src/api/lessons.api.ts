import api from "./axios";

export type LearningPath = {
  id: string;
  title: string;
  description: string;
};

export type LessonSummary = {
  id: string;
  title: string;
  summary: string;
  sortOrder: number;
};

export type LessonDetail = {
  id: string;
  title: string;
  summary: string;
  content: {
    explanation: string;
    visual: string;
    interactive: string;
    quiz: Array<{
      id: string;
      text: string;
      options: string[];
      answerIndex: number;
    }>;
  };
};

export const listLearningPaths = async (age: number) => {
  const response = await api.get<LearningPath[]>("/api/learning-paths", {
    params: { age }
  });
  return response.data;
};

export const listLessonsForPath = async (pathId: string, age: number) => {
  const response = await api.get<LessonSummary[]>(`/api/learning-paths/${pathId}/lessons`, {
    params: { age }
  });
  return response.data;
};

export const getLessonDetail = async (lessonId: string) => {
  const response = await api.get<LessonDetail>(`/api/lessons/${lessonId}`);
  return response.data;
};

export const completeLesson = async (lessonId: string, payload: { childId: string; score: number }) => {
  const response = await api.post(`/api/lessons/${lessonId}/complete`, payload);
  return response.data as { progressId: string; xpAwarded: number };
};
