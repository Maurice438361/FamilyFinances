"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BalanceCard } from "@/features/transactions/components/BalanceCard";
import { HistoryCard } from "@/features/transactions/components/HistoryCard";
import { TransactionList } from "@/features/transactions/components/TransactionList";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { fetchTransactions } from "@/features/transactions/api/transactionsApi";
import { deleteTransaction } from "@/features/transactions/api/transactionsApi";
import {
  calculateBalance,
  generateMonthlyHistory,
} from "@/features/transactions/methods/calculateBalance";
import {
  Transaction,
  BalanceData,
  MonthlyHistory,
} from "@/features/transactions/types";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [history, setHistory] = useState<MonthlyHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const filteredTransactions =
    selectedMonth === "all"
      ? transactions
      : transactions.filter((t) => t.month === selectedMonth);

  const balance = calculateBalance(filteredTransactions);
  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);

      setTransactions((prev) => {
        const updated = prev.filter((t) => t._id !== id);

        setHistory(generateMonthlyHistory(updated));

        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  };
  const sortedTransactions = [...filteredTransactions].sort((a, b) =>
    b.month.localeCompare(a.month),
  );
  const sortedMonths = Array.from(
    new Set(transactions.map((t) => t.month)),
  ).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setHistory(generateMonthlyHistory(data));
        const latestMonth = [...data]
          .map((t) => t.month)
          .sort((a, b) => b.localeCompare(a))[0];

        setSelectedMonth(latestMonth ?? "all");
      } catch (err) {
        setError("Failed to load transactions");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-[url('/assets/background.png')] bg-cover bg-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* Left side: logo + title grouped */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.png"
              alt="Family Finances logo"
              className="w-20 h-20 object-contain"
            />

            <h1 className="text-4xl font-md text-white leading-none">
              <span className="block">Family</span>
              <span className="block">Finances</span>
            </h1>
          </div>

          {/* Right side: action */}
          <div className="flex items-center gap-3">
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="all">All months</option>

              {sortedMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </Select>

            <Link href="/add-transaction">
              <Button variant="primary" size="xl">
                Add transaction
              </Button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-200 text-red-800 p-4 rounded">
            {error}
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BalanceCard balance={balance} />
          <HistoryCard history={history} />
        </div>

        {/* Transaction List */}
        <TransactionList
          transactions={sortedTransactions}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
