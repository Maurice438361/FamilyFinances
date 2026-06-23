import { Transaction, BalanceData, MonthlyHistory } from '../types';

/**
 * Calculate total balance, income, and expenses
 * @param transactions - Array of all transactions
 * @returns BalanceData object with totals
 */
export const calculateBalance = (transactions: Transaction[]): BalanceData => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  return {
    total: totalIncome - totalExpense,
    income: totalIncome,
    expense: totalExpense,
  };
};

/**
 * Group transactions by month
 * @param transactions - Array of transactions
 * @returns Array of transaction groups by month
 */
export const groupByMonth = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {};

  transactions.forEach((transaction) => {
    const month = transaction.month;
    if (!grouped[month]) {
      grouped[month] = [];
    }
    grouped[month].push(transaction);
  });

  return Object.entries(grouped).map(([month, items]) => ({
    month,
    transactions: items,
  }));
};

/**
 * Generate monthly history (balance per month)
 * @param transactions - Array of all transactions
 * @returns Array of monthly balance history
 */
export const generateMonthlyHistory = (transactions: Transaction[]): MonthlyHistory[] => {
  const grouped = groupByMonth(transactions);

  return grouped.map((group) => {
    const income = group.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = group.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month: group.month,
      income,
      expense,
      balance: income - expense,
    };
  });
};

/**
 * Format number as currency (€)
 * @param amount - Number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return `€ ${amount.toFixed(2).replace('.', ',')}`;
};
