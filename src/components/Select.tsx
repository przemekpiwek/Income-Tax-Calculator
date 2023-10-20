import React from "react";

type SelectProps = {
  id: string;
  label?: string;
  value?: string;
  options: Array<Record<string, string | number>>;
  onChange?: () => void;
};

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
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange} data-testid="select">
        {renderOptions()}
      </select>
    </>
  );
};

export default Select;
