import type { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className={"text-sm font-medium  text-white focus-within:bg-indigo-600"}
      >
        {label}
      </label>
      <div className={"mt-2"}>
        <div className="mt-2 flex items-center rounded-md border border-gray-300 bg-gray-100">
          <input
            className={`flex w-full  border-0 bg-gray-600 px-1 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0`}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
