import { useAsync } from "@/hooks/useAsync";
import { dbGetAccounts } from "@/lib/database/accounts";
import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";
import { useMemo } from "react";

export const useAccounts = (options?: { withDeleted?: boolean }) => {
  const [staleIndicator] = useAccountsStaleIndicator();
  const getAccounts = useMemo(
    () => async () => {
      const accounts = await dbGetAccounts();
      return options?.withDeleted
        ? accounts
        : accounts.filter((account) => !account.deletedAt);
    },
    [options?.withDeleted]
  );

  const { data, isLoading } = useAsync(getAccounts, {
    deps: [staleIndicator],
  });

  return { data, isLoading };
};
