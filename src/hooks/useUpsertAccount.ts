import { useAccountsStaleIndicator } from "@/providers/AccountsStaleIndicator";
import { dbUpsertAccount } from "@/lib/database/accounts";
import { Account } from "@/lib/database/common";
import { useState } from "react";

export const useUpsertAccount = () => {
  const [_, setStaleIndicator] = useAccountsStaleIndicator();

  const [isLoading, setIsLoading] = useState(false);

  const upsertAccount = async (account: Account) => {
    setIsLoading(true);
    const response = await dbUpsertAccount(account);
    setStaleIndicator((prev) => prev + 1);
    setIsLoading(false);
    return response;
  };

  return { isLoading, upsertAccount };
};
