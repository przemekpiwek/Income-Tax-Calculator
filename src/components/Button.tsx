import * as React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  label?: string;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ type, label, isDisabled }) => {
  return (
    <button type={type} disabled={isDisabled}>
      {label}
    </button>
  );
};

export default Button;
