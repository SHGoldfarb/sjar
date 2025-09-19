"use client";

import { useUpsertTransaction } from "@/hooks/useUpsertTransaction";
import * as React from "react";
import TransactionForm from "./components/TransactionForm";
import { Transaction } from "@/lib/database/common";
import { useRouter } from "next/navigation";
import { useCurrentTransaction } from "./hooks/useCurrentTransaction";

const TransactionPage = () => {
  const { upsertTransaction } = useUpsertTransaction();
  const router = useRouter();

  const { data: transaction } = useCurrentTransaction();

  if (!transaction) {
    return null;
  }

  const handleDelete = async () => {
    await upsertTransaction({ ...transaction, deletedAt: new Date() });
    router.push("/");
  };

  const handleSubmit = async (newValues: Transaction) => {
    await upsertTransaction({ ...transaction, ...newValues });
    router.push("/");
  };
  return (
    <TransactionForm
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      transaction={transaction}
    />
  );
};

export default TransactionPage;
