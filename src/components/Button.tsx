import * as React from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  label?: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  isDisabled,
  onClick,
}) => {
  return (
    <button type={type} disabled={isDisabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
