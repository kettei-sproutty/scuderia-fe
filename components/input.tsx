import React from "react";

type InputTextProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, required, error, id, ...props }, ref) => (
    <div>
      <label htmlFor={id} className="text-sm font-medium  text-white focus-within:bg-indigo-600">
        {label}
        {required && <span>*</span>}
      </label>
      <div className="mt-2">
        <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-gray-100">
          <input
            type="text"
            ref={ref}
            className="flex w-full  border-0 bg-gray-600 px-1 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0"
            {...props}
          />
        </div>
      </div>
      {error && <span>{error}</span>}
    </div>
  ),
);

InputText.displayName = "InputTextComponent";

export default InputText;
