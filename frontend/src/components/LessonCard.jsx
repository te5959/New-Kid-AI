import React from "react";

const LessonCard = ({ title, summary, status }) => {
  return (
    <div className="card lesson-card">
      <div>
        <h4>{title}</h4>
        <p>{summary}</p>
      </div>
      <span className={`pill pill--${status}`}>{status}</span>
    </div>
  );
};

export default LessonCard;
