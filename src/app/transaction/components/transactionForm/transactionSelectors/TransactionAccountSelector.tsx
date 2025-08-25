import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccounts } from "@/hooks/useAccounts";

export const TransactionAccountSelector = ({ name }: { name?: string }) => {
  const { data: accounts } = useAccounts();

  return (
    <Select name={name || "accountId"}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        {accounts?.map((account) => (
          <SelectItem value={`${account.id}`} key={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
