"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "../methods/calculateBalance";
import { Transaction } from "../types";
import { formatMonth } from "../utils/formatMonth";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  if (transactions.length === 0) {
    return <Card>No transactions yet.</Card>;
  }

  return (
    <Card className="bg-[#FFEAED] border-solid border border-[#FFAFBA]">
      <h3 className="text-xl font-bold text-black mb-4">Transactions</h3>
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="grid grid-cols-[3fr_2fr_1fr_1fr] items-center p-3 bg-[#FFDCE1] rounded-lg"
          >
            <div>
              <p className="text-lg font-semibold text-black">
                {transaction.category}
              </p>
              <p className="text-md text-gray-600">{transaction.description}</p>
            </div>
            <div>
              <p className="text-lg text-black">{transaction.paidBy}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => onDelete(transaction._id)}
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/assets/delete.png"
                  alt="Delete transaction"
                  className="w-6 h-6"
                />
              </button>
            </div>
            <div className="text-right">
              <p
                className={`font-bold text-lg ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-lg text-black">
                {formatMonth(transaction.month)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
