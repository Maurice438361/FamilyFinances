// Core Transaction Type
export type TransactionType = 'income' | 'expense';
export type RecurringType = 'one-time' | 'recurring';

export interface Transaction {
  _id?: string;
  amount: number;
  type: TransactionType;
  recurring: RecurringType;
  category: string;
  description: string;
  paidBy: string;
  month: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BalanceData {
  total: number;
  income: number;
  expense: number;
}

export interface MonthlyHistory {
  month: string;
  income: number;
  expense: number;
  balance: number;
}

export interface TransactionGroup {
  month: string;
  transactions: Transaction[];
}
