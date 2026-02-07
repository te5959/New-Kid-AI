import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Mascot from "../../components/mascot/Mascot";
import { Dataset, getDatasets, trainModel, TrainingResult } from "../../api/playground.api";

const PlaygroundPage = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [activeDataset, setActiveDataset] = useState<Dataset | null>(null);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getDatasets();
      setDatasets(data);
      setActiveDataset(data[0] || null);
      setLoading(false);
    };
    load();
  }, []);

  const train = async () => {
    if (!activeDataset) return;
    const labeledSamples = activeDataset.samples
      .filter((sample) => labels[sample.id])
      .map((sample) => ({ id: sample.id, label: labels[sample.id] }));
    const response = await trainModel({ datasetId: activeDataset.id, labeledSamples });
    setResult(response);
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading playground...</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold text-ink">AI Playground</h2>
          <p className="mt-2 text-sm text-slate-600">
            Choose a dataset, label examples, and train a tiny AI helper.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {datasets.map((dataset) => (
              <Button
                key={dataset.id}
                variant={activeDataset?.id === dataset.id ? "primary" : "ghost"}
                onClick={() => {
                  setActiveDataset(dataset);
                  setLabels({});
                  setResult(null);
                }}
              >
                {dataset.title}
              </Button>
            ))}
          </div>
        </Card>

        {activeDataset && (
          <Card>
            <h3 className="text-lg font-semibold text-ink">Label Examples</h3>
            <div className="mt-4 space-y-3">
              {activeDataset.samples.map((sample) => (
                <div key={sample.id} className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-sm text-slate-600">
                    Sample {sample.id}: {JSON.stringify(sample.features)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {activeDataset.labels.map((label) => (
                      <button
                        key={label}
                        onClick={() => setLabels((prev) => ({ ...prev, [sample.id]: label }))}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                          labels[sample.id] === label
                            ? "border-ocean bg-ocean/10 text-ocean"
                            : "border-slate-200 text-slate-500"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4" onClick={train}>
              Train AI
            </Button>
          </Card>
        )}

        {result && (
          <Card className="bg-mint/20">
            <h3 className="text-lg font-semibold text-ink">Training Results</h3>
            <p className="mt-2 text-sm text-slate-600">AI confidence per label:</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {result.confidence.map((item) => (
                <li key={item.label}>
                  {item.label}: {(item.confidence * 100).toFixed(0)}%
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>
      <Mascot message="Try labeling more examples to make your AI smarter." />
    </div>
  );
};

export default PlaygroundPage;
