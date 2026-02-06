import React from "react";
import StatCard from "../components/StatCard.jsx";
import LessonCard from "../components/LessonCard.jsx";
import Badge from "../components/Badge.jsx";

const ChildDashboard = () => {
  return (
    <main className="page">
      <h2>Hello, Maya!</h2>
      <p className="helper">Today’s mission: Discover how AI learns patterns.</p>

      <section className="grid">
        <StatCard title="XP" value="120" detail="Level 3" />
        <StatCard title="Streak" value="4 days" detail="Keep it going!" />
        <StatCard title="Progress" value="45%" detail="6 lessons complete" />
      </section>

      <section className="section">
        <h3>Next Lessons</h3>
        <div className="stack">
          <LessonCard title="AI is a Helper" summary="Learn how AI uses examples." status="ready" />
          <LessonCard title="Machines Learn Patterns" summary="Find repeating shapes." status="locked" />
        </div>
      </section>

      <section className="section">
        <h3>Badges</h3>
        <div className="grid">
          <Badge title="Curious Explorer" description="Finished your first lesson." />
          <Badge title="Pattern Spotter" description="Scored 80% on a quiz." />
        </div>
      </section>
    </main>
  );
};

export default ChildDashboard;
