import { CalculateTaxesResponse, TaxBracket } from "../types/types";

export const calculateTaxes = (
  income: number,
  taxBrackets: TaxBracket[]
): CalculateTaxesResponse => {
  let totalTax = 0;
  let remainingIncome = income;
  const taxesPerBracket = [];

  if (income < 0) return { income, totalTax: 0, taxesPerBracket: [] };

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

    const totalTaxForBracket = taxableAmountForBracket * taxBracketRate;

    totalTax += totalTaxForBracket;

    taxesPerBracket.push({
      ...taxBracket,
      tax: totalTax,
    });

    remainingIncome -= taxableAmountForBracket;
  }
  return {
    income,
    totalTax: Number(totalTax.toFixed(2)),
    taxesPerBracket,
  };
};

export const getEffectiveTaxRate = (totalTax: number, income: number) => {
  if (income === 0) return 0;

  return (totalTax / income) * 100;
};
