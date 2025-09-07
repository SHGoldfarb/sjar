import { AccountsTransaction } from "@/lib/database/common";
import React from "react";
import { useAccount } from "@/hooks/useAccount";
import BaseTransactionCard from "./components/BaseTransactionCard";

const AccountsTransactionCard = ({
  transaction,
}: {
  transaction: AccountsTransaction;
}) => {
  const { data: originAccount } = useAccount(transaction.originAccountId);
  const { data: destinationAccount } = useAccount(
    transaction.destinationAccountId
  );
  return (
    <BaseTransactionCard
      dateIso={transaction.dateIso}
      firstDetail={originAccount?.name}
      secondDetail={destinationAccount?.name}
      amount={transaction.amount}
      detailsSeparator="->"
    />
  );
};

export default AccountsTransactionCard;
