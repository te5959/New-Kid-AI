import React from "react";

const Badge = ({ title, description }) => {
  return (
    <div className="card badge">
      <div className="badge__icon">⭐</div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Badge;
