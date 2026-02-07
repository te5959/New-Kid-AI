import { Request, Response } from "express";
import { listDatasets, trainClassifier, predictSample, getChatbotReply } from "../services/playgroundService.js";
import { trainSchema, predictSchema } from "../validators/playgroundValidators.js";

export const getDatasets = (req: Request, res: Response) => {
  return res.json(listDatasets());
};

export const train = (req: Request, res: Response) => {
  const payload = trainSchema.parse(req.body);
  const result = trainClassifier(payload.datasetId, payload.labeledSamples);
  if (!result) {
    return res.status(400).json({ error: "Unknown dataset." });
  }
  return res.json(result);
};

export const predict = (req: Request, res: Response) => {
  const payload = predictSchema.parse(req.body);
  const result = predictSample(payload.labelConfidence);
  return res.json(result);
};

export const chatbot = (req: Request, res: Response) => {
  const index = Number(req.query.index || 0);
  return res.json({ message: getChatbotReply(index) });
};
