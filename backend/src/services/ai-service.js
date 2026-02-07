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
  "AI learns from examples!",
  "Patterns help AI make smart guesses.",
  "AI is a helper, not a person.",
  "Try adding more examples to make your model better!"
];

export const listDatasets = () => datasets.map(({ id, title, labels, samples }) => ({
  id,
  title,
  labels,
  samples
}));

export const trainClassifier = ({ datasetId, labeledSamples }) => {
  const labelCounts = labeledSamples.reduce((acc, sample) => {
    acc[sample.label] = (acc[sample.label] || 0) + 1;
    return acc;
  }, {});

  const total = Object.values(labelCounts).reduce((sum, value) => sum + value, 0);
  const confidence = Object.entries(labelCounts).map(([label, count]) => ({
    label,
    confidence: total === 0 ? 0 : Number((count / total).toFixed(2))
  }));

  return {
    datasetId,
    totalSamples: total,
    confidence
  };
};

export const predictSample = ({ labelConfidence }) => {
  if (!labelConfidence.length) {
    return { prediction: null, confidence: 0 };
  }
  const best = labelConfidence.reduce((max, item) =>
    item.confidence > max.confidence ? item : max
  );
  return { prediction: best.label, confidence: best.confidence };
};

export const chatbotResponse = (index) => {
  const safeIndex = Number.isInteger(index) ? index % chatbotReplies.length : 0;
  return chatbotReplies[safeIndex];
};
