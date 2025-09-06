import * as React from "react";
import Form from "next/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Transaction } from "@/lib/database/common";
import { parseTransactionFormData } from "./utils";
import { TransactionSelectors } from "./transactionForm/TransactionSelectors";
import { TransactionDateInput } from "./transactionForm/TransactionDateInput";
import { TransactionTimeInput } from "./transactionForm/TransactionTimeInput";
import { isTransactionValid } from "@/lib/database/transactions";

const TransactionForm = ({
  onSubmit,
}: {
  onSubmit: (transaction: Transaction) => unknown;
}) => {
  const handleSubmit = async (formData: FormData) => {
    const transaction = parseTransactionFormData(formData);
    if (transaction && isTransactionValid(transaction)) {
      await onSubmit(transaction);
    }
  };
  return (
    <Form action={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <TransactionDateInput />
        </div>
        <div className="flex-1">
          <TransactionTimeInput />
        </div>
      </div>
      <TransactionSelectors />
      <Input
        defaultValue={""}
        placeholder="Amount"
        name="amount"
        type="number"
      />
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default TransactionForm;
