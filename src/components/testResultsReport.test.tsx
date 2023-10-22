import { render, screen } from "@testing-library/react";
import ResultsReport from "./ResultsReport";
import { getEffectiveTaxRate } from "../utils/taxFunctions";

describe("Results Report", () => {
  const mockCalculatedTaxData = {
    income: 99997,
    totalTax: 17738.55,
    taxesPerBracket: [
      {
        max: 50197,
        min: 0,
        rate: 0.15,
        tax: 7529.549999999999,
      },
      {
        max: 100392,
        min: 50197,
        rate: 0.205,
        tax: 17738.55,
      },
    ],
  };

  const defaultProps = {
    calculatedTaxData: mockCalculatedTaxData,
  };
  it("should render title of report", () => {
    render(<ResultsReport {...defaultProps} />);
    expect(screen.getByText("Your Results:")).toBeInTheDocument();
  });
  it("should render total tax correctly", () => {
    const totalTaxValue = mockCalculatedTaxData.totalTax.toLocaleString();
    render(<ResultsReport {...defaultProps} />);

    expect(screen.getByText("Total Tax:")).toBeInTheDocument();
    expect(screen.getByTestId("totalTaxOutput")).toHaveTextContent(
      `$${totalTaxValue}`
    );
  });

  it("should render income tax correctly", () => {
    const incomeValue = mockCalculatedTaxData.income.toLocaleString();
    render(<ResultsReport {...defaultProps} />);

    expect(screen.getByText("Income:")).toBeInTheDocument();
    expect(screen.getByTestId("incomeOutput")).toHaveTextContent(
      `$${incomeValue}`
    );
  });

  it("should render Tax Breakdown section", () => {
    render(<ResultsReport {...defaultProps} />);

    expect(screen.getByText("Tax Breakdown:")).toBeInTheDocument();
  });

  it("should render Effective Tax section", () => {
    const effectiveTax = getEffectiveTaxRate(
      mockCalculatedTaxData.totalTax,
      mockCalculatedTaxData.income
    );
    render(<ResultsReport {...defaultProps} />);

    expect(screen.getByText("Effective Tax:")).toBeInTheDocument();
    expect(screen.getByTestId("effectiveTaxOutput")).toHaveTextContent(
      `${effectiveTax.toFixed(2)}%`
    );
  });
});
