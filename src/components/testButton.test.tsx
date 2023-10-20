import * as React from "react";
import Button from "./Button";
import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";

describe("Button", () => {
  it("should render correctly", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should be disabled when isDisabled is true", () => {
    render(<Button isDisabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
