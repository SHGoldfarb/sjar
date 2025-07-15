"use client";

import { Button } from "@/components/ui/button";
import { useAccount } from "@/hooks/useAccount";
import { useUpsertAccount } from "@/hooks/useUpsertAccount";
import { useRouter, useSearchParams } from "next/navigation";
import { AccountForm } from "./components/AccountForm";

const AccountPage = () => {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");
  const { upsertAccount } = useUpsertAccount();

  const router = useRouter();

  const { data: account, isLoading } = useAccount(Number(accountId));

  const handleSave = async (value: string) => {
    if (account) {
      const updatedAccount = {
        ...account,
        name: value,
      };
      await upsertAccount(updatedAccount);
      router.push("/accounts");
    }
  };

  const handleDelete = async () => {
    if (account) {
      await upsertAccount({ ...account, deletedAt: new Date() });
      router.push("/accounts");
    }
  };

  if (isLoading || !account) {
    return null;
  }

  return (
    <AccountForm onSubmit={handleSave} defaultValue={account?.name || ""}>
      <Button onClick={handleDelete} type="button">
        Delete
      </Button>
    </AccountForm>
  );
};

export default AccountPage;
