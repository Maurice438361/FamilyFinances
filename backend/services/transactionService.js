const Transaction = require('../models/Transaction');

/**
 * Transaction Service
 * Pure business logic - reusable across routes
 * No HTTP knowledge here
 */

// Get all transactions
const getAllTransactions = async () => {
  return await Transaction.find().sort({ createdAt: -1 });
};

// Get transactions by month
const getTransactionsByMonth = async (month) => {
  return await Transaction.find({ month }).sort({ createdAt: -1 });
};

// Create transaction
const createTransaction = async (transactionData) => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

// Update transaction
const updateTransaction = async (id, updateData) => {
  return await Transaction.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete transaction
const deleteTransaction = async (id) => {
  return await Transaction.findByIdAndDelete(id);
};

// Calculate balance from transactions
const calculateBalance = async () => {
  const transactions = await getAllTransactions();
  
  let income = 0;
  let expense = 0;
  
  transactions.forEach((t) => {
    if (t.type === 'income') {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });
  
  return {
    total: income - expense,
    income,
    expense,
  };
};

module.exports = {
  getAllTransactions,
  getTransactionsByMonth,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  calculateBalance,
};
