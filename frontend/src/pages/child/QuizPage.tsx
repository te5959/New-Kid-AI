import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import RewardToast from "../../components/gamification/RewardToast";
import { getLessonDetail, completeLesson } from "../../api/lessons.api";
import { useChild } from "../../context/ChildContext";

const QuizPage = () => {
  const [params] = useSearchParams();
  const lessonId = params.get("lessonId");
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [xpAward, setXpAward] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Awaited<ReturnType<typeof getLessonDetail>> | null>(null);
  const { activeChild, refreshInsights } = useChild();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!lessonId) {
        setLoading(false);
        return;
      }
      const detail = await getLessonDetail(lessonId);
      setQuiz(detail);
      setLoading(false);
    };
    load();
  }, [lessonId]);

  const score = useMemo(() => {
    if (!quiz) return 0;
    const correct = quiz.content.quiz.filter(
      (question) => selected[question.id] === question.answerIndex
    ).length;
    return Math.round((correct / quiz.content.quiz.length) * 100);
  }, [quiz, selected]);

  const submitQuiz = async () => {
    if (!quiz || !activeChild) return;
    setSubmitted(true);
    const result = await completeLesson(quiz.id, { childId: activeChild.id, score });
    setXpAward(result.xpAwarded);
    await refreshInsights();
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading quiz...</p>;
  }

  if (!quiz) {
    return (
      <Card>
        <p className="text-sm text-slate-600">Quiz not available.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-ink">Quick Quiz</h2>
        <p className="mt-2 text-sm text-slate-600">Choose the best answer for each question.</p>
      </Card>
      <div className="space-y-4">
        {quiz.content.quiz.map((question) => (
          <Card key={question.id}>
            <p className="font-semibold text-ink">{question.text}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {question.options.map((option, index) => {
                const isSelected = selected[question.id] === index;
                const isCorrect = submitted && question.answerIndex === index;
                const isIncorrect = submitted && isSelected && !isCorrect;
                return (
                  <button
                    key={option}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      isSelected ? "border-ocean bg-ocean/10" : "border-slate-200"
                    } ${isCorrect ? "border-mint bg-mint/20" : ""} ${
                      isIncorrect ? "border-rose-300 bg-rose-50" : ""
                    }`}
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [question.id]: index
                      }))
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
      {submitted ? (
        <div className="space-y-3">
          <RewardToast message={`Great job! You earned ${xpAward} XP.`} />
          <Button onClick={() => navigate("/child/dashboard")}>Back to dashboard</Button>
        </div>
      ) : (
        <Button onClick={submitQuiz} disabled={!Object.keys(selected).length}>
          Submit Quiz
        </Button>
      )}
    </div>
  );
};

export default QuizPage;
