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
  width: 100%;
  margin: 64px 0;
`;

const Title = styled.h1``;
const Subtitle = styled.h3``;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Box = styled.div`
  flex: 1;
  margin: 30px;
  padding: 30px;
  box-shadow: 0 0 16px 4px var(--disabled);
  border-radius: 5px;
  position: relative;
  background-color: var(--white);
`;

const BoxTitle = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  position: inherit;
  top: 0;
  border-radius: 5px 5px 0 0;
  padding-left: 4px;
`;

const OutputContent = styled.div`
  height: 100%;
  width: 100%;
  padding-left: 4px;
  text-align: left;
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
  const [calculatedTaxData, setCalculatedTaxData] =
    React.useState<CalculateTaxesResponse>({
      totalTax: 0,
      taxesPerBracket: [],
    });

  const [formData, setFormData] = React.useState<UserFormFormData>({
    ...defaultUserFormState,
  });

  const resetForm = () => {
    console.log("RESET FORM");
    setFormData(defaultUserFormState);
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

  const { data, isError, isLoading } = useQuery(
    ["taxBracket", formData.taxYear],
    () => fetchTaxBrackets(formData.taxYear)
  );

  console.log("$data", data);

  const { totalTax, taxesPerBracket } = calculatedTaxData;

  return (
    <PageWrapper>
      <TitleWrapper>
        <Title>Canada Income Tax Calculator</Title>
        <Subtitle>
          How much do you owe? Get an estimate of your taxes below!
        </Subtitle>
      </TitleWrapper>
      <ContentWrapper>
        <Box>
          <UserForm
            taxBrackets={[]}
            formData={formData}
            resetForm={resetForm}
            defaultTaxYearOptions={defaultTaxYearOptions}
            setCalculatedTaxData={setCalculatedTaxData}
            onChange={onChange}
          />
        </Box>
        <Box>
          <BoxTitle>Calculated tax output:</BoxTitle>
          <OutputContent>
            Estimated Tax Owed:{totalTax}
            <ul>
              {taxesPerBracket.map((t, index) => (
                <li key={index}>
                  Min: {t.min}
                  <br />
                  Max: {t.max}
                  <br />
                  Tax: {t.tax}
                  <br />
                </li>
              ))}
            </ul>
            Effective Tax Rate
          </OutputContent>
        </Box>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default TaxCalculator;
