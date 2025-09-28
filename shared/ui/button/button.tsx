import { ComponentProps } from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
} & ComponentProps<"button">;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
}
