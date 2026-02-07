import api from "./axios";

export type ParentDashboardChild = {
  id: string;
  displayName: string;
  age: number;
  lessonsCompleted: number;
  dailyMinutes: number;
  totalXp: number;
};

export type ApprovalItem = {
  id: string;
  lessonId: string;
  lessonTitle: string;
  childId: string;
  childName: string;
};

export const getParentDashboard = async () => {
  const response = await api.get<{ children: ParentDashboardChild[] }>("/api/parents/dashboard");
  return response.data;
};

export const getApprovals = async () => {
  const response = await api.get<ApprovalItem[]>("/api/parents/approvals");
  return response.data;
};

export const approveLesson = async (payload: { childId: string; lessonId: string }) => {
  const response = await api.post("/api/parents/approve", payload);
  return response.data;
};

export const setScreenTime = async (childId: string, dailyMinutes: number) => {
  const response = await api.post(`/api/children/${childId}/limits`, { dailyMinutes });
  return response.data;
};
