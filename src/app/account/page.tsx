"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount } from "@/hooks/useAccount";
import { useUpsertAccount } from "@/hooks/useUpsertAccount";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import Form from "next/form";

const AccountPage = () => {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");
  const { upsertAccount } = useUpsertAccount();

  const router = useRouter();

  const { data: account, isLoading } = useAccount(Number(accountId));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (inputRef.current?.value && account) {
      const updatedAccount = {
        ...account,
        name: inputRef.current.value,
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
    <Form action={handleSave}>
      <Input
        defaultValue={account?.name || ""}
        placeholder="Account Name"
        ref={inputRef}
      />
      <Button type="submit">Save</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Form>
  );
};

export default AccountPage;
