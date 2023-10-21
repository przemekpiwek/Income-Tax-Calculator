import { calculateTaxes } from "./taxFunctions";

describe("calculateTaxes", () => {
  const mockTaxBrackets = [
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

  it("should return zero upon receiving a negative income", () => {
    const { totalTax } = calculateTaxes(-10000, mockTaxBrackets);
    expect(totalTax).toEqual(0.0);
  });

  it("should return zero upon receiving income of zero", () => {
    const { totalTax } = calculateTaxes(0, mockTaxBrackets);
    expect(totalTax).toEqual(0.0);
  });

  it("should return correct taxes owed for an income within the first bracket", () => {
    const { totalTax } = calculateTaxes(25000, mockTaxBrackets);
    expect(totalTax).toEqual(3750.0);
  });

  it("should return correct taxes owed for an income within the second bracket", () => {
    const { totalTax } = calculateTaxes(85000, mockTaxBrackets);
    expect(totalTax).toEqual(14664.16);
  });

  it("should return correct taxes owed for an income within the third bracket", () => {
    const { totalTax } = calculateTaxes(120000, mockTaxBrackets);
    expect(totalTax).toEqual(22917.6);
  });

  it("should return correct taxes owed for an income within the fourth bracket", () => {
    const { totalTax } = calculateTaxes(200000, mockTaxBrackets);
    expect(totalTax).toEqual(45048.85);
  });

  it("should return correct taxes owed for an income within the fifth bracket", () => {
    const { totalTax } = calculateTaxes(230000, mockTaxBrackets);
    expect(totalTax).toEqual(54080.53);
  });

  it.todo("tests covering the correct bracket taxes");
  it.todo("tests covering effective tax rate");
});
