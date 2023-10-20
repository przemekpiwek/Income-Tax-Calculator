import { TaxBracket } from "../components/Form";

export const calculateTaxes = (income: number, taxBrackets: TaxBracket[]) => {
  let totalTax = 0;
  let remainingIncome = income;

  if (income < 0) return 0;

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

    remainingIncome -= taxableAmountForBracket;
  }
  return Number(totalTax.toFixed(2));
};

export {};
