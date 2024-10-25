const express = require('express');
const router = express.Router();
const {
  seedDatabase,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
} = require('../controllers/transactionController');

// Seed Database
router.get('/seed', seedDatabase);

// Get all transactions
router.get('/', getTransactions);

// Get statistics for a month
router.get('/statistics', getStatistics);

// Get bar chart data
router.get('/barchart', getBarChart);

// Get pie chart data
router.get('/piechart', getPieChart);

// Get combined API data
router.get('/combined', getCombinedData);

module.exports = router;
