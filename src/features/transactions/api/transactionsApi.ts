import { Transaction } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Fetch all transactions
 */
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return await response.json();
  } catch (error) {
    console.error('Fetch transactions error:', error);
    throw error;
  }
};

/**
 * Create a new transaction
 */
export const createTransaction = async (transaction: Omit<Transaction, '_id'>): Promise<Transaction> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return await response.json();
  } catch (error) {
    console.error('Create transaction error:', error);
    throw error;
  }
};

/**
 * Update a transaction
 */
export const updateTransaction = async (
  id: string,
  transaction: Partial<Transaction>
): Promise<Transaction> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    if (!response.ok) throw new Error('Failed to update transaction');
    return await response.json();
  } catch (error) {
    console.error('Update transaction error:', error);
    throw error;
  }
};

/**
 * Delete a transaction
 */
export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
  } catch (error) {
    console.error('Delete transaction error:', error);
    throw error;
  }
};
