import { IncomeTransaction } from "@/lib/database/common";
import React from "react";
import { useAccount } from "@/hooks/useAccount";
import { useJar } from "@/hooks/useJar";
import BaseTransactionCard from "./components/BaseTransactionCard";

const IncomeTransactionCard = ({
  transaction,
}: {
  transaction: IncomeTransaction;
}) => {
  const { data: account } = useAccount(transaction.accountId);
  const { data: jar } = useJar(transaction.jarId);
  return (
    <BaseTransactionCard
      dateIso={transaction.dateIso}
      firstDetail={account?.name}
      secondDetail={jar?.name}
      amount={transaction.amount}
      amountColor="income"
    />
  );
};

export default IncomeTransactionCard;
