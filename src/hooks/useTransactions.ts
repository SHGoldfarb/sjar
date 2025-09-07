import { dbGetTransactions } from "@/lib/database/transactions";
import { useTransactionsStaleIndicator } from "@/providers/TransactionsStaleIndicator";
import { useQuery } from "./useQuery";

export const useTransactions = (options?: { withDeleted?: boolean }) => {
  const [staleIndicator] = useTransactionsStaleIndicator();
  const getTransactions = async () => {
    const transactions = await dbGetTransactions();
    return options?.withDeleted
      ? transactions
      : transactions.filter((transaction) => !transaction.deletedAt);
  };

  const { data, isLoading } = useQuery(getTransactions, {
    key: ["useTransactions", options, staleIndicator],
  });

  return { data, isLoading };
};
