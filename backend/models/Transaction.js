const mongoose = require('mongoose');

/**
 * Transaction Schema
 * Defines structure and validation for transactions
 */
const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be positive'],
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Type must be income or expense'],
    },
    recurring: {
      type: String,
      enum: ['one-time', 'recurring'],
      default: 'one-time',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      default: '',
    },
    paidBy: {
      type: String,
      required: [true, 'Paid by is required'],
    },
    month: {
      type: String,
      required: [true, 'Month is required'],
    },
  },
  {
    timestamps: true, // Auto-adds createdAt and updatedAt
  }
);

// Create and export model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
