"use client";

import { useUpsertTransaction } from "@/hooks/useUpsertTransaction";
import * as React from "react";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "@/lib/database/common";
import { useRouter } from "next/navigation";

const TransactionNewPage = () => {
  const { upsertTransaction } = useUpsertTransaction();
  const router = useRouter();
  const handleSubmit = async (transaction: Transaction) => {
    await upsertTransaction(transaction);
    router.push("/");
  };
  return <TransactionForm onSubmit={handleSubmit} />;
};

export default TransactionNewPage;
