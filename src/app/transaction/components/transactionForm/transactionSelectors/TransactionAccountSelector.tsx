import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccounts } from "@/hooks/useAccounts";

export const TransactionAccountSelector = ({
  name,
  initialValue: defaultAccountId,
}: {
  name?: string;
  initialValue?: number;
}) => {
  const { data: accounts } = useAccounts({ withDeleted: true });
  const availableAccounts = accounts?.filter(
    (account) => !account.deletedAt || account.id === defaultAccountId
  );
  return (
    <Select
      name={name || "accountId"}
      defaultValue={defaultAccountId?.toString()}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        {availableAccounts?.map((account) => (
          <SelectItem value={`${account.id}`} key={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
