import { z } from "zod";

export const trainSchema = z.object({
  datasetId: z.string().min(2),
  labeledSamples: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1)
    })
  )
});

export const predictSchema = z.object({
  labelConfidence: z.array(
    z.object({
      label: z.string(),
      confidence: z.number().min(0).max(1)
    })
  )
});
