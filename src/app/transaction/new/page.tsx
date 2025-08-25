"use client";

import { useUpsertTransaction } from "@/hooks/useUpsertTransaction";
import * as React from "react";
import TransactionForm from "../components/TransactionForm";

const TransactionNewPage = () => {
  const { upsertTransaction } = useUpsertTransaction();
  return <TransactionForm onSubmit={upsertTransaction} />;
};

export default TransactionNewPage;
