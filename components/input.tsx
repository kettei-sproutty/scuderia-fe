import clsx from "clsx";
import React from "react";

type InputTextProps = {
  label: string;
  error?: string;
  id: string;
  //TODO define if we want variants with icons/prefixes/suffixes
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, required, error, id, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col">
        <div
          className={clsx(
            "relative grid w-full grid-cols-[minmax(25%,auto)_1fr] rounded-sm text-sm text-primary-100 focus-within:ring-2 focus-within:ring-primary-100 hover:ring-2 hover:ring-primary-100 focus:outline-none",
            { "border-2 border-error-light": error },
            { "border border-primary-100 ": !error },
          )}
        >
          <label
            htmlFor={id}
            className="flex items-center justify-center border-r border-primary-50 bg-primary-950 px-2 text-xs text-primary-100"
          >
            {label}
            {required && <span>*</span>}
          </label>
          <input
            id={id}
            type="text"
            ref={ref}
            className={clsx("flex w-full bg-transparent px-2 py-1.5  focus:outline-none")}
            {...props}
          />
        </div>
        {error && <span className={"text-sm font-semibold text-error-light"}>{error}</span>}
      </div>
    );
  },
);

InputText.displayName = "InputTextComponent";

export default InputText;
