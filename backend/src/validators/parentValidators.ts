import { z } from "zod";

export const approveLessonSchema = z.object({
  childId: z.string().uuid(),
  lessonId: z.string().uuid()
});
