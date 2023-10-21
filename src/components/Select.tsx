import React from "react";
import styled from "styled-components";

type SelectProps = {
  id: string;
  label?: string;
  value?: string;
  options: Array<Record<string, string | number>>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectWrapper = styled.div`
  position: relative;
  margin: 15px 0px;
`;

const Label = styled.label`
  position: absolute;
  pointer-events: none;
  left: 20px;
  top: -10px;
`;

const BaseSelect = styled.select`
  height: 56px;
  border-radius: 8px;
  border: 2px var(--secondary) solid;
  margin: 16px;
  width: 100%;

  &:focus {
    outline: none;
    border: 4px var(--primary) solid;
  }
`;

const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
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
    <SelectWrapper>
      <Label htmlFor={id}>{label}</Label>
      <BaseSelect
        id={id}
        value={value}
        onChange={onChange}
        data-testid="select"
      >
        {renderOptions()}
      </BaseSelect>
    </SelectWrapper>
  );
};

export default Select;
