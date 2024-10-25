import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable/TransactionTable';
import Statistics from './components/StatisticsBox/StatisticsBox';
import BarChart from './components/BarChart/BarChart';
import { fetchCombinedData } from './services/api';

function App() {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    // Fetch the combined data when the month changes or search changes
    const getData = async () => {
      const response = await fetchCombinedData(month);
      setData(response);
    };
    getData();
  }, [month]);

  return (
    <div className="app-container">
      <h1>Transactions Dashboard</h1>

      {/* Month Dropdown */}
      <label htmlFor="month">Select Month:</label>
      <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m, idx) => (
          <option key={idx} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Transaction Table */}
      {data && (
        <>
          <TransactionTable transactions={data.transactions} search={search} />

          {/* Statistics */}
          <Statistics stats={data.statistics} />

          {/* Bar Chart */}
          <BarChart barData={data.barChart} />

          {/* Pie Chart */}
          <PieChart pieData={data.pieChart} />
        </>
      )}
    </div>
  );
}

export default App;
