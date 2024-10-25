import React, { useState, useEffect } from 'react';
import BarChart from '../BarChart/BarChart';
import { fetchTransactions } from '../../services/api'; // Adjust the import path as necessary
import './TransactionTable.css';

const TransactionTable = () => {
  const [month, setMonth] = useState('March');
  const [searchText, setSearchText] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const getTransactionsData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTransactions(month, searchText);
      setTransactions(data);
    } catch (err) {
      setError('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactionsData(); // Fetch transactions whenever month or searchText changes
  }, [month, searchText]);

  return (
    <div className="dashboard">
      <h2>Transaction Dashboard</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search transaction"
          value={searchText}
          onChange={handleSearchChange}
        />
        <select value={month} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <button onClick={getTransactionsData}>Search</button>
      </div>

      {loading && <p>Loading transactions...</p>}
      {error && <p className="error">{error}</p>}
      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                {/* Format date as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No transactions found.</p>
      )}

      {/* Bar Chart Component */}
      <BarChart month={month} />
    </div>
  );
};

export default TransactionTable;
