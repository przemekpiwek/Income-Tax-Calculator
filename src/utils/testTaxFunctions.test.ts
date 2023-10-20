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
    expect(calculateTaxes(-10000, mockTaxBrackets)).toEqual(0.0);
  });

  it("should return zero upon receiving income of zero", () => {
    expect(calculateTaxes(0, mockTaxBrackets)).toEqual(0.0);
  });

  it("should return correct taxes owed for an income within the first bracket", () => {
    expect(calculateTaxes(25000, mockTaxBrackets)).toEqual(3750.0);
  });

  it("should return correct taxes owed for an income within the second bracket", () => {
    expect(calculateTaxes(85000, mockTaxBrackets)).toEqual(14664.16);
  });

  it("should return correct taxes owed for an income within the third bracket", () => {
    expect(calculateTaxes(120000, mockTaxBrackets)).toEqual(22917.6);
  });

  it("should return correct taxes owed for an income within the fourth bracket", () => {
    expect(calculateTaxes(200000, mockTaxBrackets)).toEqual(45048.85);
  });

  it("should return correct taxes owed for an income within the fifth bracket", () => {
    expect(calculateTaxes(230000, mockTaxBrackets)).toEqual(54080.53);
  });
});
