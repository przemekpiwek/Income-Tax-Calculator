import * as React from "react";
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
  font-weight: 600;
`;

const BaseSelect = styled.select`
  height: 56px;
  border-radius: 8px;
  border: 2px var(--secondary) solid;
  margin: 16px;
  width: 100%;
  padding-left: 10px;

  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='blue' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 12px;

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
