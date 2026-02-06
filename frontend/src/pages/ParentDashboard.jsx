import React from "react";
import StatCard from "../components/StatCard.jsx";

const ParentDashboard = () => {
  return (
    <main className="page">
      <h2>Parent Dashboard</h2>
      <section className="grid">
        <StatCard title="Children" value="2" detail="Ages 9 & 12" />
        <StatCard title="Weekly Time" value="120 min" detail="Limit: 150 min" />
        <StatCard title="Lessons Approved" value="8" detail="2 pending" />
      </section>

      <section className="section">
        <h3>Approvals</h3>
        <div className="card">
          <p>New lesson: "Image Recognition" for Maya (age 9).</p>
          <div className="stack">
            <button className="button">Approve</button>
            <button className="button button--ghost">Review</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>Screen-time Limits</h3>
        <div className="card">
          <p>Set daily minutes per child.</p>
          <div className="stack">
            <button className="button button--ghost">Maya: 30 min</button>
            <button className="button button--ghost">Leo: 45 min</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ParentDashboard;
