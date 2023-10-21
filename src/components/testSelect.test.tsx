import * as React from "react";
import Select from "./Select";
import { fireEvent, screen } from "@testing-library/react";
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

    expect(screen.getByText(2017)).toBeInTheDocument();
    expect(screen.getByText(2018)).toBeInTheDocument();
    expect(screen.getByText(2019)).toBeInTheDocument();
    expect(screen.getByText(2020)).toBeInTheDocument();
  });

  it.todo("should call onChange funtion upon user change");
});
