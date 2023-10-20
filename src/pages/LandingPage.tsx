import styled from "styled-components";
import InputForm from "../components/Form";
import * as React from "react";
import { CalculateTaxesResponse } from "../utils/taxFunctions";

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
  background-color: var(--tertiary);
  position: inherit;
  top: 0;
  border-radius: 5px 5px 0 0;
  padding-left: 4px;
`;

const OutputContent = styled.div`
  display: flex;
  background: red;
  height: 100%;
  width: 100%;
  padding-left: 4px;
`;

const LandingPage = () => {
  const [calculatedTaxData, setCalculatedTaxData] =
    React.useState<CalculateTaxesResponse>({
      totalTax: 0,
      taxesPerBracket: [],
    });

  const { totalTax } = calculatedTaxData;

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
          <InputForm setCalculatedTaxData={setCalculatedTaxData} />
        </Box>
        <Box>
          <BoxTitle>Calculated tax output</BoxTitle>
          <OutputContent>{totalTax}</OutputContent>
        </Box>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default LandingPage;
