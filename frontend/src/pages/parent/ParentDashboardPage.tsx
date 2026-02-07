import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Mascot from "../../components/mascot/Mascot";
import { listChildren, ChildProfile } from "../../api/children.api";
import { getProgress, getXp } from "../../api/progress.api";
import api from "../../api/axios";

const ParentDashboardPage = () => {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await listChildren();
      setChildren(data);
      setLoading(false);
    };
    load();
  }, []);

  const setLimit = async (childId: string, minutes: number) => {
    await api.post(`/api/parents/limits/${childId}`, { dailyMinutes: minutes });
    setMessage("Screen-time updated.");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <Card>
          <h2 className="text-2xl font-bold text-ink">Parent Dashboard</h2>
          <p className="mt-2 text-sm text-slate-600">
            Review progress, approve learning, and manage healthy screen time.
          </p>
        </Card>

        {loading ? (
          <p className="text-sm text-slate-500">Loading children...</p>
        ) : (
          <div className="space-y-4">
            {children.map((child) => (
              <Card key={child.id}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{child.displayName}</h3>
                    <p className="text-sm text-slate-600">Age {child.age}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="soft" onClick={() => setLimit(child.id, 30)}>
                      30 min
                    </Button>
                    <Button variant="soft" onClick={() => setLimit(child.id, 45)}>
                      45 min
                    </Button>
                    <Button variant="soft" onClick={() => setLimit(child.id, 60)}>
                      60 min
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                  <ParentProgress childId={child.id} />
                </div>
              </Card>
            ))}
          </div>
        )}
        {message && <p className="text-sm text-emerald-600">{message}</p>}
      </section>
      <Mascot message="Parents stay in control with approvals and gentle limits." />
    </div>
  );
};

const ParentProgress = ({ childId }: { childId: string }) => {
  const [summary, setSummary] = useState<{ completed: number; total: number; xp: number } | null>(
    null
  );

  useEffect(() => {
    const load = async () => {
      const progress = await getProgress(childId);
      const xp = await getXp(childId);
      const total = progress.completed + progress.in_progress + progress.locked;
      setSummary({ completed: progress.completed, total, xp: xp.totalXp });
    };
    load();
  }, [childId]);

  if (!summary) {
    return <p>Loading progress...</p>;
  }

  return (
    <>
      <p>Lessons complete: {summary.completed} / {summary.total}</p>
      <p>Total XP: {summary.xp}</p>
    </>
  );
};

export default ParentDashboardPage;
