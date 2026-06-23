"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "../methods/calculateBalance";
import { BalanceData } from "../types";

interface BalanceCardProps {
  balance: BalanceData;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <Card className="bg-[#FFEAED] border-solid border border-[#FFAFBA]">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-black">Balance</h2>
        <p className="text-4xl font-bold text-black">
          {formatCurrency(balance.total)}
        </p>
        <div className="flex gap-8 text-lg">
          <div>
            <p className="text-gray-600">Income</p>
            <p className="text-lg font-semibold text-green-600">
              {formatCurrency(balance.income)}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Expenses</p>
            <p className="text-lg font-semibold text-red-600">
              {formatCurrency(balance.expense)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
