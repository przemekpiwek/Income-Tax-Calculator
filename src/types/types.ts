export type Error = {
  code: string;
  field: string;
  message: string;
};

export type ErrorResponse = {
  errors: Error[];
};

export type TaxYearOption = {
  value: number;
  displayValue: string;
};

export type TaxBracket = {
  min: number;
  max?: number;
  rate: number;
};

export type TaxBracketResponse = Record<string, TaxBracket[]>;

export type CalculateTaxesResponse = {
  income: number;
  totalTax: number;
  taxesPerBracket: Array<TaxBracket & { tax: number }>;
};

export type UserFormFormData = {
  income: string;
  taxYear: string;
};

export enum Status {
  SUCCESS = "success",
  ERROR = "error",
  LOADING = "loading",
  DEFAULT = "default",
}
