import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/progress/ProgressBar";
import Mascot from "../../components/mascot/Mascot";
import { useChild } from "../../context/ChildContext";
import { listLearningPaths, listLessonsForPath, LessonSummary } from "../../api/lessons.api";

const ChildDashboardPage = () => {
  const { activeChild, insights, refreshInsights } = useChild();
  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!activeChild) {
        return;
      }
      setLoading(true);
      await refreshInsights();
      const paths = await listLearningPaths(activeChild.age);
      if (paths.length) {
        const pathLessons = await listLessonsForPath(paths[0].id, activeChild.age, activeChild.id);
        setLessons(pathLessons);
      }
      setLoading(false);
    };
    load();
  }, [activeChild?.id]);

  if (!activeChild) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Select a child profile first.</p>
        <Link to="/child">
          <Button className="mt-4">Choose child</Button>
        </Link>
      </Card>
    );
  }

  const completed = insights.progress?.completed ?? 0;
  const total = completed + (insights.progress?.in_progress ?? 0) + (insights.progress?.locked ?? 0);
  const progressPercent = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60">
          <h2 className="text-2xl font-bold text-ink">Hi {activeChild.displayName}!</h2>
          <p className="mt-2 text-sm text-slate-600">
            Today we will explore new AI patterns and build your curiosity streak.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="bg-ocean/10">
              <p className="text-xs font-semibold text-ocean">XP</p>
              <p className="text-2xl font-bold text-ink">{insights.xp?.totalXp ?? 0}</p>
              <p className="text-sm text-slate-600">Level {insights.xp?.level ?? 1}</p>
            </Card>
            <Card className="bg-mint/20">
              <p className="text-xs font-semibold text-ink">Streak</p>
              <p className="text-2xl font-bold text-ink">{insights.streak?.currentDays ?? 0} days</p>
              <p className="text-sm text-slate-600">Longest {insights.streak?.longestDays ?? 0}</p>
            </Card>
            <Card className="bg-lavender/10">
              <p className="text-xs font-semibold text-ink">Progress</p>
              <p className="text-2xl font-bold text-ink">{progressPercent}%</p>
              <ProgressBar value={progressPercent} />
            </Card>
          </div>
        </div>

        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-ink">Next Lessons</h3>
            <Button variant="ghost" onClick={() => navigate("/child/playground")}>
              AI Playground
            </Button>
          </div>
          {loading ? (
            <p className="mt-4 text-sm text-slate-500">Loading lessons...</p>
          ) : (
            <div className="mt-4 space-y-3">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4">
                  <div>
                    <p className="text-base font-semibold text-ink">{lesson.title}</p>
                    <p className="text-sm text-slate-600">{lesson.summary}</p>
                    {lesson.status && (
                      <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                        {lesson.status}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => navigate(`/child/lesson?lessonId=${lesson.id}`)}
                    disabled={lesson.status === "locked"}
                  >
                    {lesson.status === "locked" ? "Locked" : "Start"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>
      <Mascot message="Keep learning! Each lesson gives you XP and badges." />
    </div>
  );
};

export default ChildDashboardPage;
