import api from "./axios";

export type ProgressSummary = {
  locked: number;
  in_progress: number;
  completed: number;
};

export type XpSummary = {
  totalXp: number;
  level: number;
  nextThreshold: number;
};

export type StreakSummary = {
  currentDays: number;
  longestDays: number;
  lastActivityDate: string | null;
};

export type BadgeSummary = {
  code: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
};

export const getProgress = async (childId: string) => {
  const response = await api.get<ProgressSummary>(`/api/children/${childId}/progress`);
  return response.data;
};

export const getXp = async (childId: string) => {
  const response = await api.get<XpSummary>(`/api/children/${childId}/xp`);
  return response.data;
};

export const getStreak = async (childId: string) => {
  const response = await api.get<StreakSummary>(`/api/children/${childId}/streak`);
  return response.data;
};

export const getBadges = async (childId: string) => {
  const response = await api.get<BadgeSummary[]>(`/api/children/${childId}/badges`);
  return response.data;
};
