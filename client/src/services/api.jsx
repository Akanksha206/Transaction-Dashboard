const BASE_URL = "http://localhost:5000/api";

export const fetchTransactions = async (month, searchText, page = 1) => {
  const response = await fetch(
    `${BASE_URL}/transactions?month=${month}&search=${searchText}&page=${page}`
  );
  return response.json();
};

export const fetchBarChartStats = async (month) => {
  const response = await fetch(`${BASE_URL}/transactions/bar-chart?month=${month}`);
  return response.json();
};

export const fetchStatistics = async (month) => {
  const response = await fetch(`${BASE_URL}/transactions/statistics?month=${month}`);
  return response.json();
};

// Add fetchCombinedData to match the expected import in App.jsx
export const fetchCombinedData = async (month) => {
  const response = await fetch(`${BASE_URL}/transactions/combined?month=${month}`);
  return response.json();
};
