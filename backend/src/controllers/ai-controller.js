import { listDatasets, trainClassifier, predictSample, chatbotResponse } from "../services/ai-service.js";

export const getDatasets = (req, res) => {
  return res.json(listDatasets());
};

export const trainModel = (req, res) => {
  const { datasetId, labeledSamples } = req.body;
  if (!datasetId || !Array.isArray(labeledSamples)) {
    return res.status(400).json({ error: "Invalid training payload." });
  }
  const result = trainClassifier({ datasetId, labeledSamples });
  return res.json(result);
};

export const predict = (req, res) => {
  const { labelConfidence } = req.body;
  if (!Array.isArray(labelConfidence)) {
    return res.status(400).json({ error: "Invalid prediction payload." });
  }
  const result = predictSample({ labelConfidence });
  return res.json(result);
};

export const chatbot = (req, res) => {
  const index = Number(req.query.index || 0);
  return res.json({ message: chatbotResponse(index) });
};
