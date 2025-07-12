import { useAsync } from "@/hooks/useAsync";
import { dbGetAccounts } from "@/lib/database/accounts";
import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";
import { dbUpsertAccount } from "@/lib/database/accounts";
import { Account } from "@/lib/database/common";

export const useAccounts = () => {
  const [staleIndicator, setStaleIndicator] = useAccountsStaleIndicator();

  const upsertAccount = async (account: Account) => {
    const response = await dbUpsertAccount(account);
    setStaleIndicator((prev) => prev + 1);
    return response;
  };

  const { data, isLoading } = useAsync(dbGetAccounts, {
    deps: [staleIndicator],
  });

  return { data, isLoading, upsertAccount };
};
