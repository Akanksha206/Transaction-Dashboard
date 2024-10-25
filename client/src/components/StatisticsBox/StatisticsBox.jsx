import React, { useState, useEffect } from "react";

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSale: 0, soldItems: 0, notSoldItems: 0 });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await fetch(`http://localhost:5000/api/transactions/statistics?month=${month}`);
      const data = await response.json();
      setStatistics(data);
    };

    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h2>Statistics - {month}</h2>
      <p>Total Sale: {statistics.totalSale}</p>
      <p>Total Sold Items: {statistics.soldItems}</p>
      <p>Total Not Sold Items: {statistics.notSoldItems}</p>
    </div>
  );
};

export default StatisticsBox;
