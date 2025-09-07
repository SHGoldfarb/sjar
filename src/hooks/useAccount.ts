import { dbGetAccount } from "@/lib/database/accounts";
import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";
import { useMemo } from "react";
import { useQuery } from "./useQuery";

export const useAccount = (id: number) => {
  const [staleIndicator] = useAccountsStaleIndicator();

  const { data, isLoading } = useQuery(
    useMemo(() => () => dbGetAccount(id), [id]),
    {
      key: ["useAccount", id, staleIndicator],
    }
  );

  return { data, isLoading };
};
