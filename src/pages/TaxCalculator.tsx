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

const ReportWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  width: 55%;
  box-shadow: 0 10px 40px #0000001a;
  background: var(--white);
  border-radius: 5px;
  padding: 16px;
`;

const ReportResult = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ResultRow = styled.li`
  border-top: 1px solid #0000001a;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const ResultRowContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0;
`;
const ResultRowItemBold = styled.span`
  font-weight: 600;
`;
const ResultRowItemRegular = styled.span`
  font-weight: 400;
`;
const ResultRowItemLight = styled.span`
  font-weight: 200;
`;

type StatusBarProps = {
  isVisible: boolean;
};

const StatusBar = styled.div<StatusBarProps>`
  background: red;
  margin: 16px 0px;
  display: block;
  text-align: center;
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
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
  const [calculatedTaxData, setCalculatedTaxData] =
    React.useState<CalculateTaxesResponse>({
      income: 0,
      totalTax: 0,
      taxesPerBracket: [],
    });
  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<UserFormFormData>({
    ...defaultUserFormState,
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

  const { data, isError, isLoading, isSuccess, error, ...rest } = useQuery(
    ["taxBracket", formData.taxYear],
    () => fetchTaxBrackets(formData.taxYear)
  );

  console.log(
    "$data, iserror, islOading, error",
    data,
    isError,
    isLoading,
    error,
    rest
  );

  const showErrorStatus = isMousingOverButton && isError;
  const showSuccessStatus = hasSubmitted && isSuccess;

  const { totalTax, taxesPerBracket } = calculatedTaxData;

  return (
    <PageWrapper>
      <TitleWrapper>
        <h1>Canada Income Tax Calculator</h1>
        <h3>How much do you owe? Get an estimate of your taxes below!</h3>
      </TitleWrapper>
      <StatusBar isVisible={showErrorStatus || showSuccessStatus}>
        {showErrorStatus && <div>Error</div>}
        {showSuccessStatus && <div>Success</div>}
      </StatusBar>
      <ContentWrapper>
        <Box>
          <UserForm
            taxBrackets={[]}
            formData={formData}
            resetForm={resetForm}
            defaultTaxYearOptions={defaultTaxYearOptions}
            disableButton={isLoading || isError}
            onButtonMouseEnter={onButtonMouseEnter}
            onButtonMouseLeave={onButtonMouseLeave}
            onChange={onChange}
            setCalculatedTaxData={setCalculatedTaxData}
          />
        </Box>
        <ReportWrapper>
          <h3>Your Results:</h3>
          <ReportResult>
            <ul>
              <ResultRow>
                <ResultRowContent>
                  <ResultRowItemBold>Total Tax:</ResultRowItemBold>
                  <ResultRowItemBold>$123123123</ResultRowItemBold>
                </ResultRowContent>
              </ResultRow>
              <ResultRow>
                <ResultRowContent>
                  <ResultRowItemBold>Tax Breakdown:</ResultRowItemBold>
                  <ResultRowItemBold></ResultRowItemBold>
                </ResultRowContent>
              </ResultRow>
              <ResultRow>
                <ResultRowContent>
                  <ResultRowItemRegular>Tax Breakdown:</ResultRowItemRegular>
                  <ResultRowItemRegular></ResultRowItemRegular>
                </ResultRowContent>
              </ResultRow>
              <ResultRow>
                <ResultRowContent>
                  <ResultRowItemBold>Effective Tax:</ResultRowItemBold>
                  <ResultRowItemBold>123%</ResultRowItemBold>
                </ResultRowContent>
              </ResultRow>
            </ul>
          </ReportResult>
        </ReportWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default TaxCalculator;
