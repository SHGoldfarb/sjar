import { JarsTransaction } from "@/lib/database/common";
import React from "react";
import { useJar } from "@/hooks/useJar";
import BaseTransactionCard from "./components/BaseTransactionCard";

const JarsTransactionCard = ({
  transaction,
}: {
  transaction: JarsTransaction;
}) => {
  const { data: originJar } = useJar(transaction.originJarId);
  const { data: destinationJar } = useJar(transaction.destinationJarId);
  return (
    <BaseTransactionCard
      dateIso={transaction.dateIso}
      firstDetail={originJar?.name}
      secondDetail={destinationJar?.name}
      amount={transaction.amount}
      detailsSeparator="->"
    />
  );
};

export default JarsTransactionCard;
