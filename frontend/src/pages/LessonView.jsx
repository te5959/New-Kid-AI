import React from "react";

const LessonView = () => {
  return (
    <main className="page">
      <h2>Lesson: AI is a Helper</h2>
      <p>
        AI is a tool that learns from examples. It does not have feelings, and it only follows
        patterns.
      </p>
      <div className="card">
        <h3>Visual Story</h3>
        <p>Imagine a robot sorting toys by color. It learns by seeing many examples.</p>
      </div>
      <div className="card">
        <h3>Interactive</h3>
        <p>Drag the blue toys into the blue bin and the red toys into the red bin.</p>
      </div>
      <button className="button">Start Quiz</button>
    </main>
  );
};

export default LessonView;
