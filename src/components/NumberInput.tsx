import * as React from "react";

type InputProps = {
  id: string;
  label?: string;
  value?: number;
  legend?: string;
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: () => {};
};

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
      <input
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
