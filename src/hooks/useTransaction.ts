import { dbGetTransaction } from "@/lib/database/transactions";
import { useTransactionsStaleIndicator } from "@/providers/TransactionsStaleIndicator";
import { useQuery } from "./useQuery";

export const useTransaction = (id: number) => {
  const [staleIndicator] = useTransactionsStaleIndicator();

  const { data, isLoading } = useQuery(() => dbGetTransaction(id), {
    key: ["useTransaction", id, staleIndicator],
  });

  return { data, isLoading };
};
