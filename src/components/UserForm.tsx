import * as React from "react";
import styled from "styled-components";
import NumberInput from "./NumberInput";
import Select from "./Select";
import Button from "./Button";
import { calculateTaxes } from "../utils/taxFunctions";
import {
  CalculateTaxesResponse,
  TaxBracket,
  TaxYearOption,
  UserFormFormData,
} from "../types/types";

type FormProps = {
  taxBrackets: TaxBracket[];
  formData: UserFormFormData;
  defaultTaxYearOptions: TaxYearOption[];
  disableButton: boolean;
  resetForm: () => void;
  setHasSubmitted: (param: boolean) => void;
  onButtonMouseEnter: () => void;
  onButtonMouseLeave: () => void;
  setCalculatedTaxData: (param: CalculateTaxesResponse) => void;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

const UserForm: React.FC<FormProps> = ({
  taxBrackets,
  formData,
  defaultTaxYearOptions,
  resetForm,
  disableButton,
  setHasSubmitted,
  onButtonMouseEnter,
  onButtonMouseLeave,
  onChange,
  setCalculatedTaxData,
}) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const incomeNumber = Number(formData.income);
    const result = calculateTaxes(incomeNumber, taxBrackets);
    setCalculatedTaxData(result);
    setHasSubmitted(true);
    resetForm();
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
            value={formData.income}
            onChange={onChange}
          />
          <Select
            id="taxYear"
            label="Tax Year"
            value={formData.taxYear}
            options={defaultTaxYearOptions}
            onChange={onChange}
          />
          <FlexBox
            onMouseEnter={onButtonMouseEnter}
            onMouseLeave={onButtonMouseLeave}
          >
            <Button
              type="submit"
              label="Calculate"
              isDisabled={disableButton}
            />
          </FlexBox>
        </FormWrapper>
      </fieldset>
    </form>
  );
};

export default UserForm;
