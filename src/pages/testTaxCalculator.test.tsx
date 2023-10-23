import { fireEvent, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import TaxCalculator from "./TaxCalculator";

jest.mock("@tanstack/react-query", () => {
  const originalModule = jest.requireActual("@tanstack/react-query");

  return {
    __esModule: true,
    ...originalModule,
    useQuery: jest.fn(),
  };
});

describe("TaxCalculator", () => {
  let useQuerySpy = require("@tanstack/react-query").useQuery;
  const useQueryMockResponse = {
    isLoading: false,
    data: { tax_brackets: [] },
    isSuccess: false,
    failureCount: 0,
    isError: false,
  };

  const queryClient = new QueryClient();
  beforeEach(() => {
    useQuerySpy.mockReturnValue(useQueryMockResponse);
  });

  const TaxCalculatorWithQuery = () => (
    <QueryClientProvider client={queryClient}>
      <TaxCalculator />
    </QueryClientProvider>
  );

  it("should render tax calculator correctly", () => {
    useQuerySpy.mockReturnValueOnce({
      ...useQueryMockResponse,
      isSuccess: true,
    });
    render(<TaxCalculatorWithQuery />);
    expect(screen.getByTestId("taxCalculator")).toBeInTheDocument();
  });

  it("should render success status when successfully submitted data and mousing over submit button", async () => {
    useQuerySpy.mockReturnValue({
      ...useQueryMockResponse,
      isSuccess: true,
    });
    render(<TaxCalculatorWithQuery />);
    const calculateButton = screen.getByText("Calculate");

    fireEvent.click(calculateButton);
    fireEvent.mouseEnter(calculateButton);
    const successText = screen.getByTestId("successText");

    await waitFor(() => {
      expect(successText).toBeInTheDocument();
    });
  });

  it("should render error status when fetch is failing and mousing over submit button", async () => {
    useQuerySpy.mockReturnValue({
      ...useQueryMockResponse,
      isError: true,
    });
    render(<TaxCalculatorWithQuery />);
    const calculateButton = screen.getByText("Calculate");

    fireEvent.click(calculateButton);
    fireEvent.mouseEnter(calculateButton);

    await waitFor(() => {
      const errorText = screen.getByTestId("errorText");
      expect(errorText).toBeInTheDocument();
    });
  });

  it("should render load status when successfully submitted data and mousing over submit button", async () => {
    useQuerySpy.mockReturnValue({
      ...useQueryMockResponse,
      isLoading: true,
    });
    render(<TaxCalculatorWithQuery />);
    const calculateButton = screen.getByText("Calculate");

    fireEvent.mouseEnter(calculateButton);

    const loadingText = screen.getByTestId("loadingText");
    expect(loadingText).toBeInTheDocument();
  });
});
