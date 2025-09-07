import { Transaction } from "@/lib/database/common";
import React from "react";
import IncomeTransactionCard from "./transactionCard/IncomeTransactionCard";
import ExpenseTransactionCard from "./transactionCard/ExpenseTransactionCard";
import AccountsTransactionCard from "./transactionCard/AccountsTransactionCard";
import JarsTransactionCard from "./transactionCard/JarsTransactionCard";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { transactionType } = transaction;
  if (transactionType === "income") {
    return <IncomeTransactionCard transaction={transaction} />;
  }
  if (transactionType === "expense") {
    return <ExpenseTransactionCard transaction={transaction} />;
  }
  if (transactionType === "accounts") {
    return <AccountsTransactionCard transaction={transaction} />;
  }
  if (transactionType === "jars") {
    return <JarsTransactionCard transaction={transaction} />;
  }
};

export default TransactionCard;
