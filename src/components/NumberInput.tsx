import * as React from "react";
import styled from "styled-components";

type InputProps = {
  autofocus?: boolean;
  id: string;
  label?: string;
  value?: string;
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWrapper = styled.div`
  position: relative;
  margin: 15px 0px;
`;

const Label = styled.label`
  position: absolute;
  pointer-events: none;
  left: 20px;
  top: -10px;
  font-weight: 600;
`;

const BaseInput = styled.input`
  height: 50px;
  border-radius: 8px;
  border: 2px var(--secondary) solid;
  margin: 16px;
  width: 100%;
  padding-left: 10px;

  &:focus {
    outline: none;
    border: 4px var(--primary) solid;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const NumberInput: React.FC<InputProps> = ({
  id,
  label,
  value,
  placeholder,
  isDisabled,
  onChange,
}) => {
  return (
    <InputWrapper>
      <Label htmlFor={id}>{label}</Label>
      <BaseInput
        data-testid="input"
        disabled={isDisabled}
        type="number"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default NumberInput;
