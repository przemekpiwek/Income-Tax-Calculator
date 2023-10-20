import * as React from "react";
import styled from "styled-components";

const Title = styled.h1`
    fo
`;
const Subtitle = styled.h2``;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--white);
`;

const PageDivider = styled.div`
  display: flex;
  flex-direction: column;
`;

const LandingPage = () => {
  return (
    <>
      <TitleWrapper>
        <Title>Canada Income Tax Calculator</Title>
        <Subtitle>
          How much do you owe? Get a quick and easy estimate of your taxes using
          our online tax calculator
        </Subtitle>
      </TitleWrapper>
      <PageDivider>
        <BoxWrapper>
          Input Component
          <br />
          Select Component
          <br />
          Button Component
        </BoxWrapper>
        <BoxWrapper>
          Title - estimated taxes owed
          <br />
          Calculated tax output
          <br />
          tax breakdown
        </BoxWrapper>
      </PageDivider>
    </>
  );
};

export default LandingPage;
