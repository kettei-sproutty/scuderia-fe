import { cn } from "@utils/cn";
import React, { forwardRef } from "react";

type TextAreaProps = {
  label: string;
  error?: string;
  id: string;
  size?: "sm" | "md" | "lg";
} & React.InputHTMLAttributes<HTMLTextAreaElement>;
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, required, size, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex w-full h-full flex-col text-primary-100",
          { "text-xs": size === "sm" },
          { "text-sm": size === "md" },
          { "text-md": size === "lg" },
        )}
      >
        <label htmlFor={id} className="font-semibold uppercase text-primary-500 ">
          {label}
          {required && <span>*</span>}
        </label>
        <textarea
          className={cn(
            "my-1 rounded-sm border bg-primary-900/50 p-2 hover:ring-2 border-primary-100 hover:ring-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-none",
            { "ring-2 ring-error-light": error },
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="font-semibold text-error-light">{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = "TextAreaComponent";

export default TextArea;
