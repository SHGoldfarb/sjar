import * as React from "react";
import { useState } from "react";

import { TransactionAccountSelector } from "./transactionSelectors/TransactionAccountSelector";
import { TransactionJarSelector } from "./transactionSelectors/TransactionJarSelector";
import { TransactionTypeSelector } from "./transactionSelectors/TransactionTypeSelector";

export const TransactionSelectors = () => {
  const defaultType = "expense";
  const [selectedType, setSelectedType] = useState(defaultType);
  return (
    <>
      <TransactionTypeSelector
        onChange={setSelectedType}
        defaultValue={defaultType}
      />
      {selectedType === "expense" || selectedType === "income" ? (
        <>
          <TransactionAccountSelector name="accountId" />
          <TransactionJarSelector name="jarId" />
        </>
      ) : selectedType === "accounts" ? (
        <>
          <TransactionAccountSelector name="originAccountId" />
          <TransactionAccountSelector name="destinationAccountId" />
        </>
      ) : selectedType === "jars" ? (
        <>
          <TransactionJarSelector name="originJarId" />
          <TransactionJarSelector name="destinationJarId" />
        </>
      ) : null}
    </>
  );
};
