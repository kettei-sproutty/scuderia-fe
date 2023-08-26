import clsx from "clsx";
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
    const labelAndSuffixStyle =
      "flex items-center justify-center bg-primary-950 px-2 text-xs text-primary-100";

    const textSize = (() => {
      switch (size) {
        case "sm":
          return "text-sm";
        case "md":
          return "text-md";
        case "lg":
          return "text-lg";
      }
    })();

    return (
      <div className="flex w-full flex-col">
        <div
          className={clsx(
            "relative grid w-full grid-cols-[minmax(25%,auto)_1fr] rounded-sm text-primary-100 focus-within:ring-2 focus-within:ring-primary-100 hover:ring-2 hover:ring-primary-100 focus:outline-none",
            { "border-2 border-error-light": error },
            { "border border-primary-100 ": !error },
            { "grid-cols-[minmax(25%,auto)_1fr]": !suffix },
            { "grid-cols-[minmax(25%,auto)_1fr_minmax(25%,auto)]": suffix },
            textSize,
          )}
        >
          <label
            htmlFor={id}
            className={clsx(labelAndSuffixStyle, "border-r border-primary-50", textSize)}
          >
            {label}
            {required && <span>*</span>}
          </label>
          <input
            id={id}
            type="text"
            ref={ref}
            className={clsx("flex w-full bg-transparent px-2 py-1.5  focus:outline-none", textSize)}
            {...props}
          />
          {suffix && (
            <span className={clsx(labelAndSuffixStyle, "border-l border-primary-50")}>
              {suffix}
            </span>
          )}
        </div>
        {error && (
          <span className={clsx("text-sm font-semibold text-error-light", textSize)}>{error}</span>
        )}
      </div>
    );
  },
);

InputText.displayName = "InputTextComponent";

export default InputText;
