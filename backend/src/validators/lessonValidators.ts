import { z } from "zod";

export const completeLessonSchema = z.object({
  childId: z.string().uuid(),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      answerIndex: z.number().min(0)
    })
  )
});

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(50).default(10)
});
