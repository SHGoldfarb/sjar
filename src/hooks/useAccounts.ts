import { dbGetAccounts } from "@/lib/database/accounts";
import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";
import { useCallback } from "react";
import { useQuery } from "./useQuery";

export const useAccounts = (options?: { withDeleted?: boolean }) => {
  const [staleIndicator] = useAccountsStaleIndicator();
  const getAccounts = useCallback(async () => {
    const accounts = await dbGetAccounts();
    return options?.withDeleted
      ? accounts
      : accounts.filter((account) => !account.deletedAt);
  }, [options?.withDeleted]);

  const { data, isLoading } = useQuery(getAccounts, {
    key: ["useAccounts", options, staleIndicator],
  });

  return { data, isLoading };
};
