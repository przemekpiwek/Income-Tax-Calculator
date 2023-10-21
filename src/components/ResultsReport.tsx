import * as React from "react";
import styled from "styled-components";
import { CalculateTaxesResponse } from "../types/types";
import { getEffectiveTaxRate } from "../utils/taxFunctions";

type ResultsReportProps = {
  calculatedTaxData: CalculateTaxesResponse;
};

const ReportWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  width: 55%;
  box-shadow: 0 10px 40px #0000001a;
  background: var(--white);
  border-radius: 5px;
  padding: 20px 0px 20px 20px;
`;

const ReportResult = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
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

const ResultRowItemLight = styled.span`
  font-weight: 200;
`;

const ResultTaxBreakdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 16px;
`;

type ResultsTaxBreakdownRow = {
  lastRow?: boolean;
};
const ResultsTaxBreakdownRow = styled.div<ResultsTaxBreakdownRow>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: ${({ lastRow }) => (lastRow ? "0px" : "1px solid #f3f3f3")};
  padding-bottom: 5px;
`;

const ResultsReport: React.FC<ResultsReportProps> = ({ calculatedTaxData }) => {
  const { income, totalTax, taxesPerBracket } = calculatedTaxData;
  const effectiveTaxRate = getEffectiveTaxRate(totalTax, income);

  return (
    <ReportWrapper>
      <h3>Your Results:</h3>
      <ReportResult>
        <ul>
          <ResultRow>
            <ResultRowContent>
              <ResultRowItemBold>Total Tax:</ResultRowItemBold>
              <ResultRowItemBold>
                ${totalTax.toLocaleString()}
              </ResultRowItemBold>
            </ResultRowContent>
          </ResultRow>
          <ResultRow>
            <ResultRowContent>
              <ResultRowItemBold>Income:</ResultRowItemBold>
              <ResultRowItemBold>${income.toLocaleString()}</ResultRowItemBold>
            </ResultRowContent>
          </ResultRow>
          <ResultRow>
            <ResultRowContent>
              <ResultRowItemBold>Tax Breakdown:</ResultRowItemBold>
            </ResultRowContent>
            {taxesPerBracket.map((bracket, index) => (
              <ResultTaxBreakdownWrapper key={index}>
                <ResultsTaxBreakdownRow>
                  <ResultRowItemLight>{`Minimum (bracket ${
                    index + 1
                  }):`}</ResultRowItemLight>
                  <ResultRowItemLight>
                    ${bracket.min.toLocaleString()}
                  </ResultRowItemLight>
                </ResultsTaxBreakdownRow>
                <ResultsTaxBreakdownRow>
                  <ResultRowItemLight>Max:</ResultRowItemLight>
                  <ResultRowItemLight>
                    ${bracket.max?.toLocaleString()}
                  </ResultRowItemLight>
                </ResultsTaxBreakdownRow>
                <ResultsTaxBreakdownRow
                  lastRow={index === taxesPerBracket.length - 1}
                >
                  <ResultRowItemLight>Tax:</ResultRowItemLight>
                  <ResultRowItemLight>
                    ${bracket.tax.toLocaleString()}
                  </ResultRowItemLight>
                </ResultsTaxBreakdownRow>
              </ResultTaxBreakdownWrapper>
            ))}
          </ResultRow>
          <ResultRow>
            <ResultRowContent>
              <ResultRowItemBold>Effective Tax:</ResultRowItemBold>
              <ResultRowItemBold>
                {effectiveTaxRate.toFixed(2)}%
              </ResultRowItemBold>
            </ResultRowContent>
          </ResultRow>
        </ul>
      </ReportResult>
    </ReportWrapper>
  );
};

export default ResultsReport;
