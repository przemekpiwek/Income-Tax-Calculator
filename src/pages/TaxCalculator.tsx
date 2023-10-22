import styled from "styled-components";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTaxBrackets } from "../utils/taxBracket";
import UserForm from "../components/UserForm";
import {
  CalculateTaxesResponse,
  Status,
  TaxYearOption,
  UserFormFormData,
} from "../types/types";
import StatusBar from "../components/StatusBar";
import ResultsReport from "../components/ResultsReport";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
  margin: 64px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 16px;
  padding-bottom: 48px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Box = styled.div`
  flex: 1;
  margin: 30px;
  padding: 30px;
  border-radius: 5px;
  position: relative;
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const defaultTaxYearOptions: TaxYearOption[] = [
  {
    value: 2019,
    displayValue: "2019",
  },
  {
    value: 2020,
    displayValue: "2020",
  },
  {
    value: 2021,
    displayValue: "2021",
  },
  {
    value: 2022,
    displayValue: "2022",
  },
];

const defaultUserFormState = {
  income: "",
  taxYear: defaultTaxYearOptions[defaultTaxYearOptions.length - 1].displayValue,
};

export const defaultTaxDataState = {
  income: 0,
  totalTax: 0,
  taxesPerBracket: [],
};

const TaxCalculator = () => {
  const [isMousingOverButton, setIsMousingOverButton] =
    React.useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false);
  const [formData, setFormData] =
    React.useState<UserFormFormData>(defaultUserFormState);
  const [calculatedTaxData, setCalculatedTaxData] =
    React.useState<CalculateTaxesResponse>(defaultTaxDataState);
  const { taxYear } = formData;

  const { isLoading, error, data, isSuccess, failureCount, isError, ...rest } =
    useQuery({
      queryKey: ["taxBracket", taxYear],
      queryFn: () => fetchTaxBrackets(taxYear),
      retry: true,
    });

  const onButtonMouseEnter = () => {
    setIsMousingOverButton(true);
  };

  const onButtonMouseLeave = () => {
    setIsMousingOverButton(false);
  };

  const resetForm = () => {
    console.log("RESET FORM");
    setHasSubmitted(false);
  };

  const onChangeFormElement = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (hasSubmitted) {
      resetForm();
    }
    const key = e.target.id;
    setFormData((prevForm) => ({
      ...prevForm,
      [key]: e.target.value,
    }));
  };

  const status = () => {
    if (isMousingOverButton && isLoading) {
      return Status.LOADING;
    }
    if (hasSubmitted && isSuccess) {
      return Status.SUCCESS;
    }
    if (isMousingOverButton && isError) {
      return Status.ERROR;
    }
    return Status.DEFAULT;
  };

  return (
    <PageWrapper>
      <TitleWrapper>
        <h1>Canada Income Tax Calculator</h1>
        <h3>How much do you owe? Get an estimate of your taxes below!</h3>
      </TitleWrapper>
      <StatusWrapper>
        <StatusBar status={status()} />
      </StatusWrapper>
      <ContentWrapper>
        <Box>
          <UserForm
            taxBrackets={data?.tax_brackets}
            formData={formData}
            resetForm={resetForm}
            defaultTaxYearOptions={defaultTaxYearOptions}
            disableButton={isLoading || failureCount > 0}
            setHasSubmitted={setHasSubmitted}
            onButtonMouseEnter={onButtonMouseEnter}
            onButtonMouseLeave={onButtonMouseLeave}
            setCalculatedTaxData={setCalculatedTaxData}
            onChange={onChangeFormElement}
          />
        </Box>
        <ResultsReport calculatedTaxData={calculatedTaxData} />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default TaxCalculator;
