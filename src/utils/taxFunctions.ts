import { TaxBracket } from "../components/Form";

export type CalculateTaxesResponse = {
  totalTax: number;
  taxesPerBracket: Array<TaxBracket & { tax: number }>;
};

export const calculateTaxes = (
  income: number,
  taxBrackets: TaxBracket[]
): CalculateTaxesResponse => {
  let totalTax = 0;
  let remainingIncome = income;
  const taxesPerBracket = [];

  if (income < 0) return { totalTax: 0, taxesPerBracket: [] };

  for (let i = 0; i < taxBrackets.length; i++) {
    const taxBracket = taxBrackets[i];
    const taxBracketMin = taxBracket.min;
    const taxBracketMax = taxBracket?.max;
    const taxBracketRate = taxBracket.rate;

    if (remainingIncome <= 0) {
      break;
    }

    const taxableAmountForBracket = Math.min(
      taxBracketMax ? taxBracketMax - taxBracketMin : remainingIncome,
      remainingIncome
    );

    totalTax += taxableAmountForBracket * taxBracketRate;

    taxesPerBracket.push({
      ...taxBracket,
      tax: taxableAmountForBracket,
    });

    remainingIncome -= taxableAmountForBracket;
  }
  return {
    totalTax: Number(totalTax.toFixed(2)),
    taxesPerBracket,
  };
};

export {};
