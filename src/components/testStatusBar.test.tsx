import { screen } from "@testing-library/react";
import { render } from "@testing-library/react";
import StatusBar from "./StatusBar";
import { Status } from "../types/types";

describe("StatusBar", () => {
  it("should render correctly", () => {
    render(<StatusBar status={Status.DEFAULT} />);
    expect(screen.getByRole("statusBar", { hidden: true })).toBeInTheDocument();
  });

  it("should be hidden when in default state", () => {
    render(<StatusBar status={Status.DEFAULT} />);
    expect(screen.getByRole("statusBar", { hidden: true })).toHaveStyle({
      visibility: "hidden",
    });
  });
  it("should render error state correctly", () => {
    render(<StatusBar status={Status.ERROR} />);
    expect(screen.getByTestId("errorText")).toBeInTheDocument();
  });
  it("should render loading state correctly", () => {
    render(<StatusBar status={Status.LOADING} />);
    expect(screen.getByTestId("loadingText")).toBeInTheDocument();
  });
  it("should render success state correctly", () => {
    render(<StatusBar status={Status.SUCCESS} />);
    expect(screen.getByTestId("successText")).toBeInTheDocument();
  });
});
