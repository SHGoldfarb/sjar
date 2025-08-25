import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TransactionTypeSelector = ({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
}) => {
  return (
    <Select
      name="transactionType"
      onValueChange={onChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="expense">Expense</SelectItem>
        <SelectItem value="income">Income</SelectItem>
        <SelectItem value="accounts">Accounts Transfer</SelectItem>
        <SelectItem value="jars">Jars Transfer</SelectItem>
      </SelectContent>
    </Select>
  );
};
