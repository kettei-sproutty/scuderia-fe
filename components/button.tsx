import type { ButtonHTMLAttributes } from "react";
import { css, cx } from "@styled-system/css";

const styles = css({
  rounded: "md",
  cursor: "pointer",
  bg: "indigo.600",
  px: 3,
  py: 2,
  fontSize: "sm",
  font: "semibold",
  color: "white",
  shadow: "sm",
  "&hover": {
    bg: "indigo.500",
  },
  "&focus": {
    ring: "2",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => (
  <button className={cx(styles, className)} {...props}>
    {children}
  </button>
);

export default Button;
