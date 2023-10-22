const options = {
  method: "GET",
  Accept: "application/json",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchTaxBrackets = async (taxYear: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/tax-calculator/tax-year/${taxYear}`,
      options
    );

    if (!response.ok) {
      throw new Error(`${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Server Error:${error}`);
  }
};

export {};
