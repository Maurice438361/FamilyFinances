"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "../methods/calculateBalance";
import { MonthlyHistory } from "../types";

interface HistoryCardProps {
  history: MonthlyHistory[];
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ history }) => {
  // Get last 3 months
  const recentHistory = [...history]
    .sort((a, b) => b.month.localeCompare(a.month))
    .slice(0, 100);

  return (
    <Card className="bg-[#FFEAED] border-solid border border-[#FFAFBA]">
      <h3 className="text-xl font-bold text-black mb-4">History</h3>
      <div className="space-y-3 max-h-[15vh] overflow-y-auto pr-2">
        {recentHistory.map((month) => (
          <div
            key={month.month}
            className="flex justify-between items-center text-lg"
          >
            <span className="text-gray-600">{month.month}</span>
            <div className="flex gap-4">
              <span className="text-black-600 font-semibold">
                {formatCurrency(month.balance)}
              </span>
              <span className="text-green-600 font-semibold">
                {formatCurrency(month.income)}
              </span>
              <span className="text-red-600 font-semibold">
                {formatCurrency(month.expense)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
