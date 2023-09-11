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
          "flex w-full flex-col gap-2",
          { "text-xs": size === "sm" },
          { "text-sm": size === "md" },
          { "text-md": size === "lg" },
        )}
      >
        <div
          className={cn(
            "relative grid w-full grid-cols-[minmax(25%,auto)_1fr] ring ring-primary-700 rounded-sm text-primary-500 focus-within:ring-2 focus-within:ring-primary-200 hover:ring-2 hover:ring-primary-200 focus:outline-none ",
            {
              "ring-2 ring-error-light  focus-within:ring-error-light  hover:ring-error-light":
                error,
            },
            { "grid-cols-[minmax(25%,auto)_1fr]": !suffix },
            { "grid-cols-[minmax(25%,auto)_1fr_minmax(25%,auto)]": suffix },
          )}
        >
          <label htmlFor={id} className="input-text-label border-r border-primary-700 px-2">
            {label}
            {required && <span>*</span>}
          </label>
          <input
            id={id}
            type="text"
            ref={ref}
            className="flex w-full bg-transparent px-2 py-1.5 text-primary-200 focus:outline-none"
            {...props}
          />
          {suffix && (
            <span className="input-text-label border-l border-primary-700 px-2">{suffix}</span>
          )}
        </div>
        <span className="h-4 font-semibold text-error-light">{error || ""}</span>
      </div>
    );
  },
);

InputText.displayName = "InputTextComponent";

export default InputText;
