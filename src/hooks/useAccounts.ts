import { dbGetAccounts } from "@/lib/database/accounts";
import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";
import { useQuery } from "./useQuery";

export const useAccounts = (options?: { withDeleted?: boolean }) => {
  const [staleIndicator] = useAccountsStaleIndicator();
  const getAccounts = async () => {
    const accounts = await dbGetAccounts();
    return options?.withDeleted
      ? accounts
      : accounts.filter((account) => !account.deletedAt);
  };

  const { data, isLoading } = useQuery(getAccounts, {
    key: ["useAccounts", options, staleIndicator],
  });

  return { data, isLoading };
};
