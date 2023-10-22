import Select from "./Select";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import { defaultTaxYearOptions } from "../pages/TaxCalculator";

describe("Button", () => {
  const defaultProps = {
    id: "test",
    options: defaultTaxYearOptions,
  };
  it("should render correctly", () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });
  it("should display options upon user click", async () => {
    render(<Select {...defaultProps} />);
    const select = screen.getByTestId("select");

    fireEvent.click(select);

    expect(screen.getByText(2019)).toBeInTheDocument();
    expect(screen.getByText(2020)).toBeInTheDocument();
    expect(screen.getByText(2021)).toBeInTheDocument();
    expect(screen.getByText(2022)).toBeInTheDocument();
  });

  it("should call onChange funtion upon user change", async () => {
    const onChangeSpy = jest.fn();

    render(<Select {...defaultProps} value="2020" onChange={onChangeSpy} />);
    const select = screen.getByTestId("select");

    fireEvent.change(select, { target: { value: "2019" } });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
});
