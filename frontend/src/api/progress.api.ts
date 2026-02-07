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
  current_days: number;
  longest_days: number;
  last_activity_date: string | null;
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
  const response = await api.get(`/api/children/${childId}/badges`);
  return response.data as Array<{
    code: string;
    title: string;
    description: string;
    icon: string;
    earned_at: string;
  }>;
};
