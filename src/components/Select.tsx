import React from "react";
import styled from "styled-components";

type SelectProps = {
  id: string;
  label?: string;
  legend?: string;
  value?: string;
  options: Array<Record<string, string | number>>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const BaseSelect = styled.select`
  height: 40px;
  border-radius: 8px;
  border: 3px var(--secondary) solid;
  margin: 16px;

  &:focus {
    outline: none;
    border: 3px var(--primary) solid;
  }
`;

const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  legend,
  options,
  onChange,
}) => {
  const renderOptions = () =>
    options.map((o, index) => (
      <option key={index} value={o.value}>
        {o.displayValue}
      </option>
    ));

  return (
    <>
      <legend>{legend}</legend>
      <label htmlFor={id}>{label}</label>
      <BaseSelect
        id={id}
        value={value}
        onChange={onChange}
        data-testid="select"
      >
        {renderOptions()}
      </BaseSelect>
    </>
  );
};

export default Select;
