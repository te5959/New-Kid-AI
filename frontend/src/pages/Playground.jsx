import React from "react";

const Playground = () => {
  return (
    <main className="page">
      <h2>AI Playground</h2>
      <p>Train a mini model with safe datasets. No free text allowed.</p>
      <div className="card">
        <h3>Choose a dataset</h3>
        <div className="stack">
          <button className="button button--ghost">Shapes</button>
          <button className="button button--ghost">Animals</button>
        </div>
      </div>
      <div className="card">
        <h3>Label Examples</h3>
        <p>Label 6 samples to train your AI.</p>
        <button className="button">Start Training</button>
      </div>
      <div className="card">
        <h3>Safe Chatbot</h3>
        <p>Tap a question to get a safe reply.</p>
        <div className="stack">
          <button className="button button--ghost">What is AI?</button>
          <button className="button button--ghost">How does AI learn?</button>
        </div>
      </div>
    </main>
  );
};

export default Playground;
