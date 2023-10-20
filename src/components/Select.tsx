import React from "react";

type SelectProps = {
  id: string;
  label?: string;
  legend?: string;
  value?: string;
  options: Array<Record<string, string | number>>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

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
      <select id={id} value={value} onChange={onChange} data-testid="select">
        {renderOptions()}
      </select>
    </>
  );
};

export default Select;
