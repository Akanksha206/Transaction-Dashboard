const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date,
  sold: Boolean,
  imageUrl: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
