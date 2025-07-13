import { useAsync } from "@/hooks/useAsync";
import { dbGetAccount } from "@/lib/database/accounts";
import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";

export const useAccount = (id: number) => {
  const [staleIndicator] = useAccountsStaleIndicator();

  const { data, isLoading } = useAsync(() => dbGetAccount(id), {
    deps: [staleIndicator],
  });

  return { data, isLoading };
};
