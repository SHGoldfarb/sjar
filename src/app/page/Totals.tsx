import { useMemo } from "react";
import styles from "./totals.module.css";
import { useTransactions } from "./hooks/useTransactions";
import Amount from "./components/Amount";

const Totals = () => {
  const transactions = useTransactions();

  const totalIncome = useMemo(
    () =>
      transactions.reduce((total, transaction) => {
        if (transaction.type === "income") {
          return total + transaction.amount;
        }

        return total;
      }, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions.reduce((total, transaction) => {
        if (transaction.type === "expense") {
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
