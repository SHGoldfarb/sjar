"use client";

import { Button } from "@/components/ui/button";
import { CardList } from "@/components/ui/card-list";
import { useAccounts } from "@/hooks/useAccounts";
import Link from "next/link";
import React from "react";

const Accounts = () => {
  const { data: accounts = [] } = useAccounts();

  return (
    <CardList>
      {accounts.map((account) => (
        <Button key={account.id} asChild>
          <Link href={`/account?accountId=${account.id}`}>{account.name}</Link>
        </Button>
      ))}
      <Button asChild>
        <Link href={`/account/new`}>+</Link>
      </Button>
    </CardList>
  );
};

export default Accounts;
