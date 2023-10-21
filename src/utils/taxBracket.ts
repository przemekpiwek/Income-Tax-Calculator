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

    if (response.ok) {
      const { data } = await response.json();
      console.log("$data", data);
      return data;
    }
  } catch (error) {
    console.error("Error fetching tax brackets:", error);
    return error;
  }
};

export {};
