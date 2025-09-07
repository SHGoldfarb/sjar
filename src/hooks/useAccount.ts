import { useAsync } from "@/hooks/useAsync";
import { dbGetAccount } from "@/lib/database/accounts";
import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";
import { useMemo } from "react";

export const useAccount = (id: number) => {
  const [staleIndicator] = useAccountsStaleIndicator();

  const { data, isLoading } = useAsync(
    useMemo(() => () => dbGetAccount(id), [id]),
    {
      deps: [staleIndicator],
    }
  );

  return { data, isLoading };
};
