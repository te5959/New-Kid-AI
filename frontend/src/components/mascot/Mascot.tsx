import React from "react";

const Mascot = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl bg-mint/20 p-6 text-center shadow-sm">
      <div className="text-5xl">🤖</div>
      <p className="text-sm font-semibold text-slate-700">{message}</p>
    </div>
  );
};

export default Mascot;
