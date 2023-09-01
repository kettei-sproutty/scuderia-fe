import { cn } from "@utils/cn";
import React, { ReactNode } from "react";

type InputTextProps = {
  label: string;
  error?: string;
  id: string;
  suffix?: ReactNode;
  size?: "sm" | "md" | "lg";
  //TODO define if we want variants with icons/prefixes/suffixes
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, required, error, id, suffix, size = "md", ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex w-full flex-col",
          { "text-xs": size === "sm" },
          { "text-sm": size === "md" },
          { "text-md": size === "lg" },
        )}
      >
        <div
          className={cn(
            "relative grid w-full grid-cols-[minmax(25%,auto)_1fr] border border-primary-100 rounded-sm text-primary-100 focus-within:ring-2 focus-within:ring-primary-100 hover:ring-2 hover:ring-primary-100 focus:outline-none",
            { "ring-2 ring-error-light": error },
            { "grid-cols-[minmax(25%,auto)_1fr]": !suffix },
            { "grid-cols-[minmax(25%,auto)_1fr_minmax(25%,auto)]": suffix },
          )}
        >
          <label htmlFor={id} className="input-text-label border-r border-primary-50">
            {label}
            {required && <span>*</span>}
          </label>
          <input
            id={id}
            type="text"
            ref={ref}
            className="flex w-full bg-transparent px-2 py-1.5 focus:outline-none"
            {...props}
          />
          {suffix && <span className="input-text-label border-l border-primary-50">{suffix}</span>}
        </div>
        {error && <span className="font-semibold text-error-light">{error}</span>}
      </div>
    );
  },
);

InputText.displayName = "InputTextComponent";

export default InputText;
