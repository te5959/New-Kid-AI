import React from "react";

const RewardToast = ({ message }: { message: string }) => {
  return (
    <div className="rounded-3xl bg-lavender/20 px-6 py-4 text-center text-sm font-semibold text-lavender">
      {message}
    </div>
  );
};

export default RewardToast;
