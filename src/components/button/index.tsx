// Styles
import styles from "./styles/button.module.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  skin?: "default" | "ghost";
  children: React.ReactNode;
}

const Button = ({ skin = "default", children, ...props }: ButtonProps) => {
  const buttonClassName = skin === "ghost" ? styles["button--ghost"] : styles["button"];
  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
