"use client";

import { Button } from "@/components/ui/button";
import { useAccounts } from "@/hooks/useAccounts";
import Link from "next/link";
import { useEffect, useState } from "react";

const useCreateInitialAccounts = () => {
  const { data, isLoading, upsertAccount } = useAccounts();
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

const Accounts = () => {
  useCreateInitialAccounts();
  const { data: accounts = [] } = useAccounts();

  return (
    <div className="flex flex-col gap-4 p-4">
      {accounts.map((account) => (
        <Button key={account.id} asChild>
          <Link href={`/account?accountId=${account.id}`}>{account.name}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Accounts;
