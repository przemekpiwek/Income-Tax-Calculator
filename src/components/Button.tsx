import * as React from "react";
import styled from "styled-components";

type ButtonProps = {
  type?: "button" | "submit" | "reset" | undefined;
  label?: string;
  isDisabled?: boolean;
};

const BaseButton = styled.button`
  height: 40px;
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
`;

const Button: React.FC<ButtonProps> = ({ type, label, isDisabled }) => {
  return (
    <BaseButton type={type} disabled={isDisabled}>
      {label}
    </BaseButton>
  );
};

export default Button;
