import React from "react";

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="h-4 w-full rounded-full bg-slate-200">
      <div
        className="h-4 rounded-full bg-ocean transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

export default ProgressBar;
