import React from "react";

const QuizView = () => {
  return (
    <main className="page">
      <h2>Quick Quiz</h2>
      <div className="card">
        <p>AI learns from:</p>
        <div className="stack">
          <button className="button button--ghost">Examples</button>
          <button className="button button--ghost">Magic</button>
          <button className="button button--ghost">Luck</button>
        </div>
      </div>
      <div className="card">
        <p>AI can have feelings:</p>
        <div className="stack">
          <button className="button button--ghost">Yes</button>
          <button className="button button--ghost">No</button>
        </div>
      </div>
      <button className="button">Submit Quiz</button>
    </main>
  );
};

export default QuizView;
