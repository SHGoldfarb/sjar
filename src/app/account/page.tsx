"use client";

import { useAccount } from "@/hooks/useAccount";
import { useSearchParams } from "next/navigation";

const AccountPage = () => {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  const { data: account } = useAccount(Number(accountId));
  return <div>Account Page for {account?.name}</div>;
};

export default AccountPage;
