import { ExpenseTransaction } from "@/lib/database/common";
import React from "react";
import { useAccount } from "@/hooks/useAccount";
import { useJar } from "@/hooks/useJar";
import BaseTransactionCard from "./components/BaseTransactionCard";

const ExpenseTransactionCard = ({
  transaction,
}: {
  transaction: ExpenseTransaction;
}) => {
  const { data: account } = useAccount(transaction.accountId);
  const { data: jar } = useJar(transaction.jarId);
  return (
    <BaseTransactionCard
      dateIso={transaction.dateIso}
      firstDetail={account?.name}
      secondDetail={jar?.name}
      amount={transaction.amount}
      amountColor="expense"
    />
  );
};

export default ExpenseTransactionCard;
