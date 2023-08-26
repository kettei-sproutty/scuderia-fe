import React, { forwardRef } from "react";

type TextAreaProps = {
  label: string;
  error?: string;
  id: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, required, value, error, id, onChange }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="text-sm font-medium  text-white focus-within:bg-indigo-600">
          {label}
          {required && <span>*</span>}
        </label>
        <div className="mt-2">
          <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-gray-100">
            <textarea
              className="rounded-lg border border-gray-300 bg-transparent p-2"
              placeholder={placeholder}
              value={value}
              id={id}
              onChange={onChange}
              ref={ref}
            />
          </div>
        </div>
        {error && <span>{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = "TextAreaComponent";

export default TextArea;
