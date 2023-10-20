import * as React from "react";
import Select from "./Select";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";

describe("Button", () => {
  const defaultOptions = [
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

  const defaultProps = {
    id: "test",
    options: defaultOptions,
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
