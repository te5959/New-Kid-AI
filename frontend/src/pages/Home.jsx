import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="page home">
      <section className="hero">
        <div>
          <p className="eyebrow">Learn AI with confidence</p>
          <h1>NovaSprout AI</h1>
          <p>
            A safe, playful learning world where kids explore artificial intelligence with guided
            games and mini experiments.
          </p>
          <div className="hero__actions">
            <Link className="button" to="/onboarding">Start Learning</Link>
            <Link className="button button--ghost" to="/login">Parent Login</Link>
          </div>
        </div>
        <div className="hero__mascot">
          <div className="mascot">🤖</div>
          <p>Meet Spark, your AI buddy!</p>
        </div>
      </section>
      <section className="grid">
        <div className="card">
          <h3>Visual Lessons</h3>
          <p>Every lesson uses pictures, animations, and kid-friendly words.</p>
        </div>
        <div className="card">
          <h3>Safe Experiments</h3>
          <p>Train AI with curated datasets. No free text or unsafe content.</p>
        </div>
        <div className="card">
          <h3>Parent Controls</h3>
          <p>Approve lessons, set time limits, and track progress.</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
