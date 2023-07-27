import type { InputHTMLAttributes } from "react";
import { css, cx } from "@styled-system/css";

const labelStyles = css({
  display: "block",
  fontSize: "sm",
  fontWeight: "medium",
  color: "gray.900",
});

const inputContainerStyles = css({
  mt: 2,
  display: "flex",
  alignItems: "center",
  bg: "gray.100",
  borderRadius: "md",
  border: "1px solid",
  borderColor: "gray.300",
  "&:focus-within": {
    borderColor: "indigo.600",
  },
});

const inputStyles = css({
  display: "block",
  flex: 1,
  border: 0,
  bg: "transparent",
  py: 1.5,
  pl: 1,
  color: "gray.900",
  "&::placeholder": {
    color: "gray.400",
  },
  "&:focus": {
    ring: 0,
  },
});

type InputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={props.id} className={labelStyles}>
        {label}
      </label>
      <div className={css({ mt: 2 })}>
        <div className={inputContainerStyles}>
          <input className={cx(inputStyles, props.className)} {...props} />
        </div>
      </div>
    </div>
  );
};

export default Input;
