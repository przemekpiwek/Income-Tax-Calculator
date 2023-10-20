import * as React from "react";
import NumberInput from "./NumberInput";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
describe("NumberInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    id: "input",
  };
  it("should render correctly", () => {
    render(<NumberInput {...defaultProps} />);
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });
  it("should render label correctly", () => {
    render(<NumberInput {...defaultProps} label="income" />);
    expect(screen.getByLabelText("income")).toBeInTheDocument();
  });

  it("should respond call onChange funtion upon user input", async () => {
    const onChangeSpy = jest.fn();

    render(<NumberInput {...defaultProps} onChange={onChangeSpy} />);

    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: 123 } });

    await waitFor(() => {
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });

  it("should not call onChange funtion upon user input that is not number", async () => {
    const onChangeSpy = jest.fn();

    render(<NumberInput {...defaultProps} onChange={onChangeSpy} />);

    const input = screen.getByTestId("input");

    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.change(input, { target: { value: true } });

    await waitFor(() => {
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });
});
