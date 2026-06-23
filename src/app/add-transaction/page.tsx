"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AddTransactionForm } from "@/features/transactions/components/AddTransactionForm";
import { createTransaction } from "@/features/transactions/api/transactionsApi";
import { Transaction } from "@/features/transactions/types";
import { Button } from "@/components/ui/Button";

export default function AddTransactionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (transaction: Omit<Transaction, "_id">) => {
    setIsLoading(true);
    try {
      await createTransaction(transaction);
      router.push("/"); // Redirect to home
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[url('/assets/background.png')] bg-cover bg-center">
      <div className="max-w-lg mx-auto">
        {/* Back Button */}
        <Link href="/">
          <Button variant="primary" className="mb-6">
            Back
          </Button>
        </Link>

        <AddTransactionForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
