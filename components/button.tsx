import { cn } from "@utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import React from "react";

const buttonVariants = cva(
  "flex cursor-pointer items-center justify-center gap-2 rounded-sm transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        filled:
          "border bg-primary-50 text-primary-900 hover:bg-primary-200 hover:ring-1 hover:ring-primary-200 active:bg-primary-50",
        outlined:
          "border border-primary-300 text-primary-300 hover:text-primary-100 hover:ring-1 hover:ring-primary-100 active:bg-primary-50 active:text-primary-900",
      },
      size: {
        sm: "w-20 px-2 py-1.5 text-xs",
        md: "w-32 px-2.5 py-2 text-sm",
        lg: "w-40 px-6 py-2.5",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = ({ children, variant, size, ...props }: Omit<ButtonProps, "className">) => {
  return (
    <button className={cn(buttonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
};

export default Button;
