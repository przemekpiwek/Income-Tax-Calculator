import * as React from "react";
import styled from "styled-components";

type InputProps = {
  autofocus?: boolean;
  id: string;
  label?: string;
  value?: number;
  legend?: string;
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BaseInput = styled.input`
  height: 40px;
  border-radius: 8px;
  border: 3px var(--secondary) solid;
  margin: 16px;

  &:focus {
    outline: none;
    border: 3px var(--primary) solid;
  }
`;

const NumberInput: React.FC<InputProps> = ({
  id,
  label,
  value,
  legend,
  placeholder,
  isDisabled,
  onChange,
}) => {
  return (
    <>
      <legend>{legend}</legend>
      <label htmlFor={id}>{label}</label>
      <BaseInput
        data-testid="input"
        disabled={isDisabled}
        type="number"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default NumberInput;
