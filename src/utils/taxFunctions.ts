import { CalculateTaxesResponse, TaxBracket } from "../types/types";

/**
 * Calculate total taxes based on income and tax brackets.
 * @param {number} income - Annual income.
 * @param {TaxBracket[]} taxBrackets - Tax brackets for a given year.
 * @returns {CalculateTaxesResponse} - Object with total taxes, taxes per bracket, and income
 */
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
      tax: totalTaxForBracket,
    });

    remainingIncome -= taxableAmountForBracket;
  }
  return {
    income,
    totalTax: Number(totalTax.toFixed(2)),
    taxesPerBracket,
  };
};

/**
 * Calculate effective tax rate based on total tax and income.
 * @param {number} totalTax - Total tax owed.
 * @param {number} income - Annual income for a given year.
 * @returns {number} - Percentage rate
 */
export const getEffectiveTaxRate = (totalTax: number, income: number) => {
  if (income <= 0 || totalTax <= 0) return 0;

  return (totalTax / income) * 100;
};
