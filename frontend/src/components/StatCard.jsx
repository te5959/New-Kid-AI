import React from "react";

const StatCard = ({ title, value, detail }) => {
  return (
    <div className="card stat-card">
      <p className="stat-card__title">{title}</p>
      <h3 className="stat-card__value">{value}</h3>
      {detail && <p className="stat-card__detail">{detail}</p>}
    </div>
  );
};

export default StatCard;
