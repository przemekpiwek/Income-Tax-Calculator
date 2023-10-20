import React from "react";
import NumberInput from "./NumberInput";
import Select from "./Select";
import Button from "./Button";
import { BoxWrapper } from "../pages/LandingPage";

type FormProps = {};

export const defaultOptions = [
  {
    value: 2017,
    displayValue: "2017",
  },
  {
    value: 2018,
    displayValue: "2018",
  },
  {
    value: 2019,
    displayValue: "2019",
  },
  {
    value: 2020,
    displayValue: "2020",
  },
];

const InputForm: React.FC<FormProps> = ({}) => {
  const mockTaxBracketData = {
    tax_brackets: [
      {
        min: 0,
        max: 50197,
        rate: 0.15,
      },
      {
        min: 50197,
        max: 100392,
        rate: 0.205,
      },
      {
        min: 100392,
        max: 155625,
        rate: 0.26,
      },
      {
        min: 155625,
        max: 221708,
        rate: 0.29,
      },
      {
        min: 221708,
        rate: 0.33,
      },
    ],
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("$onSubmit");
  };

  return (
    <form onSubmit={onSubmit} data-testid="form">
      <fieldset>
        <BoxWrapper>
          <NumberInput
            id="test"
            label="Annual income tax"
            placeholder="$90,000"
            legend="Enter your annual income tax"
          />
          <br />
          <Select
            id="test"
            legend="Select your tax year"
            label="Tax Year"
            options={defaultOptions}
          />
          <br />
          <Button label="Calculate" />
        </BoxWrapper>
      </fieldset>
    </form>
  );
};

export default InputForm;
