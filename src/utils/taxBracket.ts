const options = {
  method: "GET",
  Accept: "application/json",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchTaxBrackets = async (taxYear: string) => {
  const response = await fetch(
    `http://localhost:5000/tax-calculator/tax-year/${taxYear}`,
    options
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  try {
    const data = await response.json();
    console.log("$response", data);
    return data;
  } catch (error) {
    throw new Error("Error parsing response data");
  }
};

export {};
