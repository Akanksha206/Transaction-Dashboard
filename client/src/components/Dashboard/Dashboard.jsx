import React, { useState } from "react";
import TransactionTable from "../TransactionTable/TransactionTable";
import StatisticsBox from "../StatisticsBox/StatisticsBox";
import TransactionsBarChart from "../BarChart/BarChart";

const Dashboard = () => {
  const [month, setMonth] = useState("March");

  return (
    <div>
      <TransactionTable month={month} setMonth={setMonth} />
      <StatisticsBox month={month} />
      <TransactionsBarChart month={month} />
    </div>
  );
};

export default Dashboard;
