"use client";

import { useAccounts } from "@/hooks/useAccounts";
import { useEffect, useState } from "react";

const useCreateInitialAccounts = () => {
  const { data, isLoading, upsertAccount } = useAccounts();
  const [called, setCalled] = useState(false);

  useEffect(() => {
    if (data?.length === 0 && !isLoading && !called) {
      setCalled(true);
      const initialAccounts = [
        { name: "Default Account" },
        { name: "Savings Account" },
      ];
      initialAccounts.forEach(async (account) => {
        upsertAccount(account);
      });
    }
  }, [data, isLoading, upsertAccount, called]);
};

const Accounts = () => {
  useCreateInitialAccounts();
  const { data: accounts = [] } = useAccounts();

  return (
    <div>
      {accounts.map((account) => (
        <div key={account.id}>{account.name}</div>
      ))}
    </div>
  );
};

export default Accounts;
