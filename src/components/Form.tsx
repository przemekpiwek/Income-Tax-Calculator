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
  income: string;
  taxYear: string;
};

export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export type TaxBracketResponse = Record<string, TaxBracket[]>;
const defaultFormState = {
  income: "",
  taxYear: defaultOptions[defaultOptions.length - 1].displayValue,
};

const InputForm: React.FC<FormProps> = ({ setCalculatedTaxData }) => {
  const [formData, setFormData] = React.useState<FormData>(defaultFormState);

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

  const resetForm = () => {
    console.log("RESET FORM");
    setFormData(defaultFormState);
  };

  const { tax_brackets: taxBrackets } = mockTaxBracketData;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const incomeNumber = formData.income === "" ? 0 : Number(formData.income);
    const result = calculateTaxes(incomeNumber, taxBrackets);
    setCalculatedTaxData(result);
    resetForm();
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.target.id;

    setFormData((prevForm) => ({
      ...prevForm,
      [key]: e.target.value,
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
            value={formData.income}
            onChange={onChange}
          />
          <Select
            id="taxYear"
            legend="Select your tax year"
            label="Tax Year"
            value={formData.taxYear}
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
