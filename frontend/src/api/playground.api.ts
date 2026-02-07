import api from "./axios";

export type Dataset = {
  id: string;
  title: string;
  labels: string[];
  samples: Array<{ id: string; features: Record<string, string | number> }>;
};

export type TrainingResult = {
  datasetId: string;
  totalSamples: number;
  confidence: Array<{ label: string; confidence: number }>;
};

export const getDatasets = async () => {
  const response = await api.get<Dataset[]>("/api/ai/datasets");
  return response.data;
};

export const trainModel = async (payload: {
  datasetId: string;
  labeledSamples: Array<{ id: string; label: string }>;
}) => {
  const response = await api.post<TrainingResult>("/api/ai/train", payload);
  return response.data;
};

export const predictSample = async (payload: {
  labelConfidence: Array<{ label: string; confidence: number }>;
}) => {
  const response = await api.post<{ prediction: string | null; confidence: number }>(
    "/api/ai/predict",
    payload
  );
  return response.data;
};

export const getChatbotReply = async (index: number) => {
  const response = await api.get<{ message: string }>("/api/ai/chatbot", {
    params: { index }
  });
  return response.data;
};
