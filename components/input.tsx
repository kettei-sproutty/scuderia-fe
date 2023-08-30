import { cn } from "@utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { ReactNode } from "react";

const containerVariants = cva("flex w-full flex-col", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-md",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const labelInputWrapperVariants = cva(
  "relative grid w-full grid-cols-[minmax(25%,auto)_1fr] rounded-sm text-primary-100 focus-within:ring-2 focus-within:ring-primary-100 hover:ring-2 hover:ring-primary-100 focus:outline-none",
  {
    variants: {
      error: {
        default: "border border-primary-100",
        error: "border-2 border-error-light",
      },
      suffix: {
        default: "grid-cols-[minmax(25%,auto)_1fr]",
        suffix: "grid-cols-[minmax(25%,auto)_1fr_minmax(25%,auto)]",
      },
    },
    defaultVariants: {
      error: "default",
      suffix: "default",
    },
  },
);

type InputTextProps = {
  label: string;
  id: string;
  //TODO define if we want variants with icons/prefixes/suffixes
} & React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof containerVariants> &
  VariantProps<typeof labelInputWrapperVariants>;

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, required, error, id, suffix, size, ...props }, ref) => {
    return (
      <div className={cn(containerVariants({ size }))}>
        <div
          className={cn(
            labelInputWrapperVariants({
              error: error ? "error" : "default",
              suffix: suffix ? "suffix" : "default",
            }),
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
