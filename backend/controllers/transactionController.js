const transactionService = require('../services/transactionService');

/**
 * Transaction Controller
 * Handles HTTP requests/responses
 * Calls service for business logic
 */

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get balance
exports.getBalance = async (req, res) => {
  try {
    const balance = await transactionService.calculateBalance();
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.updateTransaction(
      req.params.id,
      req.body
    );
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await transactionService.deleteTransaction(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
