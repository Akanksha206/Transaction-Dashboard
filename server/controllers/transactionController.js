const Transaction = require('../models/transaction');

// Seed Database by fetching data from the third-party API
const seedDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.deleteMany({});
    await Transaction.insertMany(response.data);
    res.json({ message: 'Database seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error seeding database' });
  }
};

const getTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
  
  const query = {};
  
  // Filter by month if provided
  if (month) {
    query.month = month;
  }

  // Filter by search text in relevant fields
  if (search) {
    query.$or = [
      { description: { $regex: search, $options: 'i' } }, 
      { category: { $regex: search, $options: 'i' } }
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(parseInt(perPage));

  res.json(transactions);
};


// Get statistics (total sales, sold items, and not sold items)
const getStatistics = async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({
    dateOfSale: { $regex: month, $options: 'i' }
  });

  const totalSale = transactions.reduce((acc, tx) => acc + tx.price, 0);
  const soldItems = transactions.filter(tx => tx.sold).length;
  const notSoldItems = transactions.length - soldItems;

  res.json({ totalSale, soldItems, notSoldItems });
};

// Get data for bar chart (price range distribution)
const getBarChart = async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({
    dateOfSale: { $regex: month, $options: 'i' }
  });

  const priceRanges = {
    '0-100': 0, '101-200': 0, '201-300': 0, '301-400': 0,
    '401-500': 0, '501-600': 0, '601-700': 0, '701-800': 0,
    '801-900': 0, '901-above': 0
  };

  transactions.forEach(tx => {
    if (tx.price >= 0 && tx.price <= 100) priceRanges['0-100']++;
    else if (tx.price >= 101 && tx.price <= 200) priceRanges['101-200']++;
    else if (tx.price >= 201 && tx.price <= 300) priceRanges['201-300']++;
    else if (tx.price >= 301 && tx.price <= 400) priceRanges['301-400']++;
    else if (tx.price >= 401 && tx.price <= 500) priceRanges['401-500']++;
    else if (tx.price >= 501 && tx.price <= 600) priceRanges['501-600']++;
    else if (tx.price >= 601 && tx.price <= 700) priceRanges['601-700']++;
    else if (tx.price >= 701 && tx.price <= 800) priceRanges['701-800']++;
    else if (tx.price >= 801 && tx.price <= 900) priceRanges['801-900']++;
    else if (tx.price > 900) priceRanges['901-above']++;
  });

  res.json(priceRanges);
};

// Get data for pie chart (category distribution)
const getPieChart = async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({
    dateOfSale: { $regex: month, $options: 'i' }
  });

  const categories = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + 1;
    return acc;
  }, {});

  res.json(categories);
};

// Get combined API response
const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    // Fetch data from all APIs
    const [transactions, stats, barChart, pieChart] = await Promise.all([
      getTransactions(req, res),
      getStatistics(req, res),
      getBarChart(req, res),
      getPieChart(req, res)
    ]);

    res.json({ transactions, stats, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching combined data' });
  }
};

module.exports = {
  seedDatabase,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
};
