export type ParentSummary = {
  id: string;
  email: string;
  displayName: string;
};

export type LessonSummary = {
  id: string;
  title: string;
  summary: string;
  sortOrder: number;
  status?: "ready" | "locked" | "completed" | "in_progress";
};
