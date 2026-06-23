"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Transaction, TransactionType, RecurringType } from "../types";

interface AddTransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "_id">) => Promise<void>;
  isLoading?: boolean;
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Omit<Transaction, "_id">>({
    amount: 0,
    type: "expense",
    recurring: "one-time",
    category: "",
    description: "",
    paidBy: "",
    month: new Date().toISOString().slice(0, 7),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.amount || formData.amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (!formData.amount || formData.amount > 10000) {
      setError("Please enter an amount between 0 and 10000");
      return;
    }
    if (!formData.paidBy) {
      setError("Please enter who paid or if it's shared");
      return;
    }
    if (!formData.paidBy || formData.paidBy.length > 50) {
      setError("Field may not exceed 50 characters");
      return;
    }
    if (!formData.category) {
      setError("Please enter a category");
      return;
    }
    if (!formData.category || formData.category.length > 50) {
      setError("Field may not exceed 50 characters");
      return;
    }
    if (!formData.description) {
      setError("Please enter a description");
      return;
    }
    if (!formData.description || formData.description.length > 100) {
      setError("Field may not exceed 100 characters");
      return;
    }
    if (!formData.month) {
      setError("Please select a month");
      return;
    }

    try {
      await onSubmit(formData);
      setSuccess(true);
      // Reset form
      setFormData({
        amount: 0,
        type: "expense",
        recurring: "one-time",
        category: "",
        description: "",
        paidBy: "",
        month: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save transaction",
      );
    }
  };

  return (
    <Card className="bg-[#FFEAED] border-solid border border-[#FFAFBA]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Add transaction</h2>

        {error && (
          <div className="bg-red-200 text-red-800 p-2 rounded text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-200 text-green-800 p-2 rounded text-sm">
            Transaction added successfully!
          </div>
        )}

        <Input
          label="Amount"
          name="amount"
          type="number"
          step="0.01"
          value={formData.amount || ""}
          onChange={handleInputChange}
          placeholder="€ 1500.00"
          max={10000}
        />

        <div className="grid grid-cols-2 gap-2">
          <Select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="expense">Outgoing</option>
            <option value="income">Incoming</option>
          </Select>

          <Select
            name="recurring"
            value={formData.recurring}
            onChange={handleInputChange}
          >
            <option value="one-time">One-time</option>
            <option value="recurring">Recurring</option>
          </Select>
        </div>

        <Input
          label="Paid by"
          name="paidBy"
          value={formData.paidBy}
          onChange={handleInputChange}
          placeholder="Shared"
          maxLength={50}
        />

        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Sustenance"
          maxLength={50}
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Groceries from Globus"
          maxLength={100}
        />

        <Select
          name="month"
          value={formData.month}
          onChange={handleInputChange}
          className="w-full"
        >
          <option value="2026-01">December 2025</option>
          <option value="2026-01">January 2026</option>
          <option value="2026-02">February 2026</option>
          <option value="2026-03">March 2026</option>
          <option value="2026-04">April 2026</option>
          <option value="2026-05">May 2026</option>
          <option value="2026-06">June 2026</option>
          <option value="2026-07">July 2026</option>
          <option value="2026-08">August 2026</option>
          <option value="2026-09">September 2026</option>
        </Select>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Card>
  );
};
