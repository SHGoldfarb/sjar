"use client";

import { Button } from "@/components/ui/button";
import { useAccounts } from "@/hooks/useAccounts";
import { useCreateInitialAccounts } from "@/lib/mock/useCreateInitialAccounts";
import Link from "next/link";

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
      <Button asChild>
        <Link href={`/account/new`}>+</Link>
      </Button>
    </div>
  );
};

export default Accounts;
