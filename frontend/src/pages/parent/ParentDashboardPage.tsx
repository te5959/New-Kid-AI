import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Mascot from "../../components/mascot/Mascot";
import { getParentDashboard, getApprovals, approveLesson, setScreenTime, ApprovalItem, ParentDashboardChild } from "../../api/parent.api";

const ParentDashboardPage = () => {
  const [children, setChildren] = useState<ParentDashboardChild[]>([]);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const [dashboard, approvalList] = await Promise.all([getParentDashboard(), getApprovals()]);
      setChildren(dashboard.children);
      setApprovals(approvalList);
      setLoading(false);
    };
    load();
  }, []);

  const setLimit = async (childId: string, minutes: number) => {
    await setScreenTime(childId, minutes);
    setMessage("Screen-time updated.");
  };

  const approve = async (item: ApprovalItem) => {
    await approveLesson({ childId: item.childId, lessonId: item.lessonId });
    setApprovals((prev) => prev.filter((entry) => entry.id !== item.id));
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
                    <div className="mt-2 text-sm text-slate-600">
                      Lessons complete: {child.lessonsCompleted}
                    </div>
                    <div className="text-sm text-slate-600">Total XP: {child.totalXp}</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
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
              </Card>
            ))}
          </div>
        )}

        <Card>
          <h3 className="text-xl font-semibold text-ink">Lesson approvals</h3>
          {approvals.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">No pending approvals.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {approvals.map((item) => (
                <div key={item.id} className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-100 p-4 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.lessonTitle}</p>
                    <p className="text-xs text-slate-500">For {item.childName}</p>
                  </div>
                  <Button onClick={() => approve(item)}>Approve</Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {message && <p className="text-sm text-emerald-600">{message}</p>}
      </section>
      <Mascot message="Parents stay in control with approvals and gentle limits." />
    </div>
  );
};

export default ParentDashboardPage;
