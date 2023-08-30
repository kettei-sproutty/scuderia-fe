import clsx from "clsx";
import React, { forwardRef } from "react";

type TextAreaProps = {
  label: string;
  error?: string;
  id: string;
  size?: "sm" | "md" | "lg";
} & React.InputHTMLAttributes<HTMLTextAreaElement>;
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, required, value, error, id, size, onChange }, ref) => {
    return (
      <div
        className={clsx(
          "flex w-full flex-col text-primary-100",
          { "text-xs": size === "sm" },
          { "text-sm": size === "md" },
          { "text-md": size === "lg" },
        )}
      >
        <label htmlFor={id}>
          {label}
          {required && <span>*</span>}
        </label>
        <textarea
          className={clsx(
            "my-1 rounded-sm border bg-transparent p-2 hover:ring-2 hover:ring-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-100",
            { "border-2 border-error-light": error },
            { "border border-primary-100 ": !error },
          )}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={onChange}
          ref={ref}
        />
        {error && <span className="font-semibold text-error-light">{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = "TextAreaComponent";

export default TextArea;
