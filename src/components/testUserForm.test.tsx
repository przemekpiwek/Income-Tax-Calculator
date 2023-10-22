import UserForm from "./UserForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { defaultTaxYearOptions } from "../pages/TaxCalculator";
import * as TaxFunctions from "../utils/taxFunctions";

describe("User Form", () => {
  const mockTaxBracket = [
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
  ];

  const defaultProps = {
    taxBrackets: mockTaxBracket,
    formData: {
      income: "",
      taxYear: "2019",
    },
    defaultTaxYearOptions,
    setHasSubmitted: () => {},
    setCalculatedTaxData: () => {},
    onChange: () => {},
  };
  it("should render the income number input correctly", () => {
    render(<UserForm {...defaultProps} />);
    expect(screen.getByLabelText("Annual income tax")).toBeInTheDocument();
  });
  it("should render the select tax year input correctly", () => {
    render(<UserForm {...defaultProps} />);
    expect(screen.getByLabelText("Tax Year")).toBeInTheDocument();
  });
  it("should calculate taxes upon user submission", () => {
    const calculateTaxesMock = jest.spyOn(TaxFunctions, "calculateTaxes");
    render(<UserForm {...defaultProps} />);
    const button = screen.getByText("Calculate");

    fireEvent.click(button);

    expect(calculateTaxesMock).toHaveBeenCalledTimes(1);
  });

  it("should set tax data to tax calculator", () => {
    const setCalculatedTaxDataMock = jest.fn();
    render(
      <UserForm
        {...defaultProps}
        setCalculatedTaxData={setCalculatedTaxDataMock}
      />
    );

    const button = screen.getByText("Calculate");
    fireEvent.click(button);

    expect(setCalculatedTaxDataMock).toHaveBeenCalled();
  });
});
