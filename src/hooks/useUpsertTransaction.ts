import { useTransactionsStaleIndicator } from "@/providers/TransactionsStaleIndicator";
import { dbUpsertTransaction } from "@/lib/database/transactions";
import { Transaction } from "@/lib/database/common";
import { useState } from "react";

export const useUpsertTransaction = () => {
  const [_, setStaleIndicator] = useTransactionsStaleIndicator();

  const [isLoading, setIsLoading] = useState(false);

  const upsertTransaction = async (transaction: Transaction) => {
    setIsLoading(true);
    const response = await dbUpsertTransaction(transaction);
    setStaleIndicator((prev) => prev + 1);
    setIsLoading(false);
    return response;
  };

  return { isLoading, upsertTransaction };
};
