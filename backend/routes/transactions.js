const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

/**
 * Transaction Routes
 * Maps URLs to controller functions
 */

// GET all transactions
router.get('/', transactionController.getAllTransactions);

// GET balance
router.get('/balance', transactionController.getBalance);

// POST create transaction
router.post('/', transactionController.createTransaction);

// PUT update transaction
router.put('/:id', transactionController.updateTransaction);

// DELETE transaction
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
