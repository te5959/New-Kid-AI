import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "soft";
};

const Button = ({ className, variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-full px-6 py-3 font-semibold transition active:scale-95 disabled:cursor-not-allowed",
        variant === "primary" && "bg-sunshine text-ink hover:bg-amber-300",
        variant === "ghost" && "border border-ocean/30 bg-white text-ink hover:bg-ocean/10",
        variant === "soft" && "bg-ocean/10 text-ocean hover:bg-ocean/20",
        className
      )}
      {...props}
    />
  );
};

export default Button;
