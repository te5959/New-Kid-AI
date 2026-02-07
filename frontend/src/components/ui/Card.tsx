import React from "react";
import clsx from "clsx";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60",
        className
      )}
      {...props}
    />
  );
};

export default Card;
