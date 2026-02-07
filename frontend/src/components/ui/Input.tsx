import React from "react";
import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
      <span>{label}</span>
      <input
        className={clsx(
          "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/30",
          error && "border-rose-400 focus:border-rose-400 focus:ring-rose-200",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </label>
  );
};

export default Input;
