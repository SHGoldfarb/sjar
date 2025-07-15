import { useAccounts } from "@/hooks/useAccounts";
import { useUpsertAccount } from "@/hooks/useUpsertAccount";
import { useEffect, useState } from "react";

export const useCreateInitialAccounts = () => {
  const { data, isLoading } = useAccounts();
  const { upsertAccount } = useUpsertAccount();
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (data?.length === 0 && !isLoading && !called) {
      setCalled(true);
      const initialAccounts = [
        { name: "Default Account", type: "account" as const },
        { name: "Savings Account", type: "account" as const },
      ];
      initialAccounts.forEach(async (account) => {
        upsertAccount(account);
      });
    }
  }, [data, isLoading, upsertAccount, called]);
};
