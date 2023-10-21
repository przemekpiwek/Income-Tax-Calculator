import * as React from "react";
import styled from "styled-components";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  label?: string;
  isDisabled?: boolean;
};

const BaseButton = styled.button`
  height: 50px;
  width: 124px;
  color: var(--white);
  background: var(--secondary);
  border-radius: 8px;
  font-weight: 600;
  border: 0px;
  margin: 16px;

  &:hover {
    background-color: var(--primary);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button: React.FC<ButtonProps> = ({ type, label, isDisabled }) => {
  return (
    <BaseButton
      type={type}
      disabled={isDisabled}
      onMouseEnter={() => console.log("yese")}
      onMouseLeave={() => console.log("yee")}
    >
      {label}
    </BaseButton>
  );
};

export default Button;
