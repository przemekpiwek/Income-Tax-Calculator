import * as React from "react";
import styled from "styled-components";
import NumberInput from "./NumberInput";
import Select from "./Select";
import Button from "./Button";
import { CalculateTaxesResponse, calculateTaxes } from "../utils/taxFunctions";

type FormProps = {
  setCalculatedTaxData: (param: CalculateTaxesResponse) => void;
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: pink;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

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

type FormData = {
  income: number;
  taxYear: string;
};

export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export type TaxBracketResponse = Record<string, TaxBracket[]>;

const InputForm: React.FC<FormProps> = ({ setCalculatedTaxData }) => {
  const [formData, setFormData] = React.useState<FormData>({
    income: 0,
    taxYear: defaultOptions[defaultOptions.length - 1].displayValue,
  });

  console.log("$formData", formData);

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

  const { tax_brackets: taxBrackets } = mockTaxBracketData;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateTaxes(formData.income, taxBrackets);
    setCalculatedTaxData(result);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.id;

    const newValue =
      key === "income" ? parseFloat(e.target.value) : e.target.value;

    setFormData((prevForm) => ({
      ...prevForm,
      [key]: newValue,
    }));
  };

  return (
    <form onSubmit={onSubmit} data-testid="form">
      <fieldset>
        <FormWrapper>
          <NumberInput
            autofocus
            id="income"
            label="Annual income tax"
            placeholder="$90,000"
            legend="Enter your annual income tax"
            onChange={onChange}
          />
          <Select
            id="taxYear"
            legend="Select your tax year"
            label="Tax Year"
            options={defaultOptions}
            onChange={onChange}
          />
          <FlexBox>
            <Button type="submit" label="Calculate" isDisabled={false} />
          </FlexBox>
        </FormWrapper>
      </fieldset>
    </form>
  );
};

export default InputForm;
