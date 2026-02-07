const datasets = [
  {
    id: "shapes",
    title: "Shapes",
    labels: ["circle", "square", "triangle"],
    samples: [
      { id: "s1", features: { sides: 0, color: "red" } },
      { id: "s2", features: { sides: 4, color: "blue" } },
      { id: "s3", features: { sides: 3, color: "yellow" } }
    ]
  },
  {
    id: "animals",
    title: "Animals",
    labels: ["cat", "dog"],
    samples: [
      { id: "a1", features: { ears: "pointy", sound: "meow" } },
      { id: "a2", features: { ears: "floppy", sound: "woof" } }
    ]
  }
];

const chatbotReplies = [
  "AI learns from examples so it can spot patterns.",
  "Try adding more examples to help your model improve.",
  "AI is a helper, but people make the choices.",
  "Great job exploring patterns!"
];

export const listDatasets = () => datasets.map(({ id, title, labels, samples }) => ({
  id,
  title,
  labels,
  samples
}));

export const trainClassifier = (datasetId: string, labeledSamples: Array<{ id: string; label: string }>) => {
  const dataset = datasets.find((data) => data.id === datasetId);
  if (!dataset) {
    return null;
  }
  const labelCounts = labeledSamples.reduce((acc, sample) => {
    if (!dataset.labels.includes(sample.label)) {
      return acc;
    }
    acc[sample.label] = (acc[sample.label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = Object.values(labelCounts).reduce((sum, value) => sum + value, 0);
  const confidence = Object.entries(labelCounts).map(([label, count]) => ({
    label,
    confidence: total === 0 ? 0 : Number((count / total).toFixed(2))
  }));

  return { datasetId, totalSamples: total, confidence };
};

export const predictSample = (labelConfidence: Array<{ label: string; confidence: number }>) => {
  if (!labelConfidence.length) {
    return { prediction: null, confidence: 0 };
  }
  const best = labelConfidence.reduce((max, item) =>
    item.confidence > max.confidence ? item : max
  );
  return { prediction: best.label, confidence: best.confidence };
};

export const getChatbotReply = (index: number) => {
  const safeIndex = Number.isInteger(index) ? index % chatbotReplies.length : 0;
  return chatbotReplies[safeIndex];
};
