import styled from "styled-components";
import * as React from "react";
import { useQuery } from "react-query";
import { fetchTaxBrackets } from "../utils/taxBracket";
import UserForm from "../components/UserForm";
import {
  CalculateTaxesResponse,
  TaxYearOption,
  UserFormFormData,
} from "../types/types";
import StatusBar, { Status } from "../components/StatusBar";
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

export const defaultTaxYearOptions: TaxYearOption[] = [
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

const defaultUserFormState = {
  income: "",
  taxYear: defaultTaxYearOptions[defaultTaxYearOptions.length - 1].displayValue,
};

const TaxCalculator = () => {
  const [isMousingOverButton, setIsMousingOverButton] =
    React.useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<UserFormFormData>({
    ...defaultUserFormState,
  });
  const [calculatedTaxData, setCalculatedTaxData] =
    React.useState<CalculateTaxesResponse>({
      income: 0,
      totalTax: 0,
      taxesPerBracket: [],
    });

  const onButtonMouseEnter = () => {
    setIsMousingOverButton(true);
  };

  const onButtonMouseLeave = () => {
    setIsMousingOverButton(false);
  };

  const resetForm = () => {
    console.log("RESET FORM");
    setFormData(defaultUserFormState);
    setHasSubmitted(false);
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

  const { data, failureCount, isLoading, isSuccess } = useQuery(
    ["taxBracket", formData.taxYear],
    () => fetchTaxBrackets(formData.taxYear)
  );

  const getStatus = React.useMemo(() => {
    if (isMousingOverButton && failureCount > 0) {
      return Status.ERROR;
    }
    if (hasSubmitted && isSuccess) {
      return Status.SUCCESS;
    }
    return Status.DEFAULT;
  }, [isMousingOverButton, hasSubmitted, isSuccess, failureCount]);

  return (
    <PageWrapper>
      <TitleWrapper>
        <h1>Canada Income Tax Calculator</h1>
        <h3>How much do you owe? Get an estimate of your taxes below!</h3>
      </TitleWrapper>
      <StatusBar status={getStatus} />
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
            onChange={onChange}
          />
        </Box>
        <ResultsReport calculatedTaxData={calculatedTaxData} />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default TaxCalculator;
