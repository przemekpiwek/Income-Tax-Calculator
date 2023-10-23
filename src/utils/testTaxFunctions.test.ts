import { calculateTaxes, getEffectiveTaxRate } from "./taxFunctions";

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

  it("should return zero and an empty taxPerBracket upon receiving a negative income", () => {
    const { totalTax, taxesPerBracket } = calculateTaxes(
      -10000,
      mockTaxBrackets
    );
    expect(totalTax).toEqual(0.0);
    expect(taxesPerBracket).toEqual([]);
  });

  it("should return zero and an empty taxPerBracket upon receiving income of zero", () => {
    const { totalTax, taxesPerBracket } = calculateTaxes(0, mockTaxBrackets);
    expect(totalTax).toEqual(0.0);
    expect(taxesPerBracket).toEqual([]);
  });

  it("should return correct taxes owed for an income within the first bracket", () => {
    const { totalTax, taxesPerBracket } = calculateTaxes(
      25000,
      mockTaxBrackets
    );
    expect(totalTax).toEqual(3750.0);
    expect(taxesPerBracket).toEqual([
      {
        max: mockTaxBrackets[0]["max"],
        min: mockTaxBrackets[0]["min"],
        rate: 0.15,
        tax: 3750,
      },
    ]);
  });

  it("should return correct taxes owed for an income within the second bracket", () => {
    const { totalTax, taxesPerBracket } = calculateTaxes(
      85000,
      mockTaxBrackets
    );
    expect(totalTax).toEqual(14664.16);
    expect(taxesPerBracket).toEqual([
      {
        max: mockTaxBrackets[0]["max"],
        min: mockTaxBrackets[0]["min"],
        rate: 0.15,
        tax: 7529.549999999999,
      },
      {
        max: mockTaxBrackets[1]["max"],
        min: mockTaxBrackets[1]["min"],
        rate: 0.205,
        tax: 7134.615,
      },
    ]);
  });

  it("should return correct taxes owed for an income within the third bracket", () => {
    const { totalTax, taxesPerBracket } = calculateTaxes(
      120000,
      mockTaxBrackets
    );
    expect(totalTax).toEqual(22917.6);
    expect(taxesPerBracket).toEqual([
      {
        max: mockTaxBrackets[0]["max"],
        min: mockTaxBrackets[0]["min"],
        rate: 0.15,
        tax: 7529.549999999999,
      },
      {
        max: mockTaxBrackets[1]["max"],
        min: mockTaxBrackets[1]["min"],
        rate: 0.205,
        tax: 10289.974999999999,
      },
      {
        max: mockTaxBrackets[2]["max"],
        min: mockTaxBrackets[2]["min"],
        rate: 0.26,
        tax: 5098.08,
      },
    ]);
  });

  it("should return correct taxes owed for an income within the fourth bracket", () => {
    const { totalTax, taxesPerBracket } = calculateTaxes(
      200000,
      mockTaxBrackets
    );
    expect(totalTax).toEqual(45048.85);
    expect(taxesPerBracket).toEqual([
      {
        max: mockTaxBrackets[0]["max"],
        min: mockTaxBrackets[0]["min"],
        rate: 0.15,
        tax: 7529.549999999999,
      },
      {
        max: mockTaxBrackets[1]["max"],
        min: mockTaxBrackets[1]["min"],
        rate: 0.205,
        tax: 10289.974999999999,
      },
      {
        max: mockTaxBrackets[2]["max"],
        min: mockTaxBrackets[2]["min"],
        rate: 0.26,
        tax: 14360.58,
      },
      {
        max: mockTaxBrackets[3]["max"],
        min: mockTaxBrackets[3]["min"],
        rate: 0.29,
        tax: 12868.75,
      },
    ]);
  });

  it("should return correct taxes owed for an income within the fifth bracket", () => {
    const { totalTax, taxesPerBracket } = calculateTaxes(
      230000,
      mockTaxBrackets
    );
    expect(totalTax).toEqual(54080.53);
    expect(taxesPerBracket).toEqual([
      {
        max: mockTaxBrackets[0]["max"],
        min: mockTaxBrackets[0]["min"],
        rate: 0.15,
        tax: 7529.549999999999,
      },
      {
        max: mockTaxBrackets[1]["max"],
        min: mockTaxBrackets[1]["min"],
        rate: 0.205,
        tax: 10289.974999999999,
      },
      {
        max: mockTaxBrackets[2]["max"],
        min: mockTaxBrackets[2]["min"],
        rate: 0.26,
        tax: 14360.58,
      },
      {
        max: mockTaxBrackets[3]["max"],
        min: mockTaxBrackets[3]["min"],
        rate: 0.29,
        tax: 19164.07,
      },
      {
        max: mockTaxBrackets[4]["max"],
        min: mockTaxBrackets[4]["min"],
        rate: 0.33,
        tax: 2736.36,
      },
    ]);
  });

  describe("Effective Tax Rate", () => {
    it("should have a tax rate of 0 if total tax is 0", () => {
      const totalTax = 0;
      const income = 10000;
      const effectiveRate = getEffectiveTaxRate(totalTax, income);
      expect(effectiveRate).toBe(0);
    });

    it("should compute correct tax rate for positive total tax and income", () => {
      const totalTax = 100000;
      const income = 50000000;
      const effectiveRate = getEffectiveTaxRate(totalTax, income);
      expect(effectiveRate).toBe(0.2);
    });

    it("should compute correct tax rate for negative total tax and income", () => {
      const totalTax = -10000;
      const income = 50000000;
      const effectiveRate = getEffectiveTaxRate(totalTax, income);
      expect(effectiveRate).toBe(0);
    });

    it("should compute correct tax rate for total tax of 0 and income of 0", () => {
      const totalTax = 0;
      const income = 0;
      const effectiveRate = getEffectiveTaxRate(totalTax, income);
      expect(effectiveRate).toBe(0);
    });
  });
});
