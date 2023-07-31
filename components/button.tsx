import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    className={`cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
