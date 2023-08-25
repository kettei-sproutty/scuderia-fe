import clsx from "clsx";
import React from "react";

type InputTextProps = {
  label?: string;
  error?: string;
  //TODO define if we want variants with icons/prefixes/suffixes
  variant?: "outlined";
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, variant = "outlined", required, error, id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="text-xs text-primary-50 ">
            {label}
            {required && <span>*</span>}
          </label>
        )}
        <div>
          <div className=" flex items-center rounded-sm ">
            <input
              type="text"
              ref={ref}
              className={clsx(
                "flex w-full rounded-sm border border-primary-100 bg-transparent px-2 py-1.5 text-sm  text-primary-100 hover:ring-1 hover:ring-primary-100 focus:outline-none focus:ring-1 focus:ring-primary-100 ",

                { "border-2 border-error-light": error },
              )}
              {...props}
            />
          </div>
        </div>
        {error && <span className={"text-sm font-semibold text-error-light"}>{error}</span>}
      </div>
    );
  },
);

InputText.displayName = "InputTextComponent";

export default InputText;
