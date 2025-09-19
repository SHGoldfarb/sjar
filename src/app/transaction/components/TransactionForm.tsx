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
  onDelete,
  transaction,
}: {
  onSubmit: (newTransactionValues: Transaction) => Promise<void>;
  onDelete?: () => Promise<void>;
  transaction?: Transaction;
}) => {
  const handleSubmit = async (formData: FormData) => {
    const newTransactionValues = parseTransactionFormData(formData);
    if (newTransactionValues && isTransactionValid(newTransactionValues)) {
      await onSubmit(newTransactionValues);
    }
  };
  const transactionDate = transaction && new Date(transaction.dateIso);
  return (
    <Form action={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <TransactionDateInput initialValue={transactionDate} />
        </div>
        <div className="flex-1">
          <TransactionTimeInput initialValue={transactionDate} />
        </div>
      </div>
      <TransactionSelectors transaction={transaction} />
      <Input
        defaultValue={transaction ? transaction.amount : ""}
        placeholder="Amount"
        name="amount"
        type="number"
      />
      <Button type="submit">Save</Button>
      {onDelete ? (
        <Button onClick={onDelete} type="button">
          Delete
        </Button>
      ) : null}
    </Form>
  );
};

export default TransactionForm;
