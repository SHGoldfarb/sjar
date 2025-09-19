import * as React from "react";
import { useState } from "react";

import { TransactionAccountSelector } from "./transactionSelectors/TransactionAccountSelector";
import { TransactionJarSelector } from "./transactionSelectors/TransactionJarSelector";
import { TransactionTypeSelector } from "./transactionSelectors/TransactionTypeSelector";
import { Transaction } from "@/lib/database/common";

export const TransactionSelectors = ({
  transaction,
}: {
  transaction?: Transaction;
}) => {
  const initialType = transaction?.transactionType || "expense";
  const [selectedType, setSelectedType] = useState(initialType);
  const initialValues = {
    accountId: undefined,
    jarId: undefined,
    originAccountId: undefined,
    destinationAccountId: undefined,
    originJarId: undefined,
    destinationJarId: undefined,
    ...transaction,
  };

  return (
    <>
      <TransactionTypeSelector
        onChange={setSelectedType}
        defaultValue={initialType}
      />
      {selectedType === "expense" || selectedType === "income" ? (
        <>
          <TransactionAccountSelector
            name="accountId"
            initialValue={initialValues.accountId}
          />
          <TransactionJarSelector
            name="jarId"
            initialValue={initialValues.jarId}
          />
        </>
      ) : selectedType === "accounts" ? (
        <>
          <TransactionAccountSelector
            name="originAccountId"
            initialValue={initialValues.originAccountId}
          />
          <TransactionAccountSelector
            name="destinationAccountId"
            initialValue={initialValues.destinationAccountId}
          />
        </>
      ) : selectedType === "jars" ? (
        <>
          <TransactionJarSelector
            name="originJarId"
            initialValue={initialValues.originJarId}
          />
          <TransactionJarSelector
            name="destinationJarId"
            initialValue={initialValues.destinationJarId}
          />
        </>
      ) : null}
    </>
  );
};
