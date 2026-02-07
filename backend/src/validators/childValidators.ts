import { z } from "zod";

export const childCreateSchema = z.object({
  displayName: z.string().min(2),
  age: z.number().min(8).max(14)
});

export const screenTimeSchema = z.object({
  dailyMinutes: z.number().min(10).max(240)
});
