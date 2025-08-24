import { useMemo } from "react";
import styles from "./totals.module.css";
import Amount from "./components/Amount";
import { useTransactions } from "@/hooks/useTransactions";

const Totals = () => {
  const { data: transactions = [] } = useTransactions();

  const totalIncome = useMemo(
    () =>
      transactions.reduce((total, transaction) => {
        if (transaction.transactionType === "income") {
          return total + transaction.amount;
        }

        return total;
      }, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions.reduce((total, transaction) => {
        if (transaction.transactionType === "expense") {
          return total + transaction.amount;
        }

        return total;
      }, 0),
    [transactions]
  );

  return (
    <div className={styles.totalsContainer}>
      <Amount type="income" amount={totalIncome} />
      <Amount type="expense" amount={totalExpense} />
    </div>
  );
};

export default Totals;
