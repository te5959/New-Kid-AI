import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Mascot from "../../components/mascot/Mascot";
import { getLessonDetail, LessonDetail } from "../../api/lessons.api";

const LessonPage = () => {
  const [params] = useSearchParams();
  const lessonId = params.get("lessonId");
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!lessonId) {
        setLoading(false);
        return;
      }
      const detail = await getLessonDetail(lessonId);
      setLesson(detail);
      setLoading(false);
    };
    load();
  }, [lessonId]);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading lesson...</p>;
  }

  if (!lesson) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Lesson not found.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <Card className="bg-ocean/10">
          <h2 className="text-2xl font-bold text-ink">{lesson.title}</h2>
          <p className="mt-2 text-sm text-slate-700">{lesson.summary}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-ink">Step 1: Easy Explanation</h3>
          <p className="mt-2 text-sm text-slate-600">{lesson.content.explanation}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-ink">Step 2: Visual Story</h3>
          <p className="mt-2 text-sm text-slate-600">{lesson.content.visual}</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-ink">Step 3: Try It</h3>
          <p className="mt-2 text-sm text-slate-600">{lesson.content.interactive}</p>
        </Card>
        <Button onClick={() => navigate(`/child/quiz?lessonId=${lesson.id}`)}>Start Quiz</Button>
      </section>
      <Mascot message="Ready? The quiz helps you earn XP and unlock badges." />
    </div>
  );
};

export default LessonPage;
