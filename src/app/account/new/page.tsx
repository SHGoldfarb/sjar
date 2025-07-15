"use client";

import { useUpsertAccount } from "@/hooks/useUpsertAccount";
import { useRouter } from "next/navigation";
import { AccountForm } from "../components/AccountForm";

const AccountNewPage = () => {
  const { upsertAccount } = useUpsertAccount();

  const router = useRouter();

  const handleSave = async (value: string) => {
    await upsertAccount({ name: value, type: "account" });
    router.push("/accounts");
  };

  return <AccountForm onSubmit={handleSave} />;
};

export default AccountNewPage;
