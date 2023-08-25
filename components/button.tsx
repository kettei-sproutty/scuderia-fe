import type { ButtonHTMLAttributes } from "react";

import clsx from "clsx";
import React from "react";

type ButtonProps = {
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  extended?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = "filled",
  size = "md",
  ...props
}: Omit<ButtonProps, "className">) => {
  return (
    <button
      className={clsx(
        "cursor-pointer justify-center rounded-sm",
        {
          "border  bg-primary-50 text-primary-900 hover:bg-primary-200 hover:ring-1 hover:ring-primary-200 ":
            variant === "filled",
        },
        {
          "border border-primary-300 text-primary-300 hover:ring-1 hover:ring-primary-100 hover:text-primary-100":
            variant === "outlined",
        },
        { "text-xs py-1.5 px-2  ": size === "sm" },
        { "text-sm py-2 px-2.5": size === "md" },
        { "text-md py-2.5 px-6": size === "lg" },
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
