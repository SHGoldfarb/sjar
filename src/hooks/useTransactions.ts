import { useAsync } from "@/hooks/useAsync";
import { dbGetTransactions } from "@/lib/database/transactions";
import { useTransactionsStaleIndicator } from "@/providers/TransactionsStaleIndicator";
import { useMemo } from "react";

export const useTransactions = (options?: { withDeleted?: boolean }) => {
  const [staleIndicator] = useTransactionsStaleIndicator();
  const getTransactions = useMemo(
    () => async () => {
      const transactions = await dbGetTransactions();
      return options?.withDeleted
        ? transactions
        : transactions.filter((transaction) => !transaction.deletedAt);
    },
    [options?.withDeleted]
  );

  const { data, isLoading } = useAsync(getTransactions, {
    deps: [staleIndicator],
  });

  return { data, isLoading };
};
