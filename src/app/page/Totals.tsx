import { useMemo } from "react";
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
    <div className="flex justify-evenly py-4">
      <Amount type="income" amount={totalIncome} className="w-30 text-center" />
      <Amount
        type="expense"
        amount={totalExpense}
        className="w-30 text-center"
      />
    </div>
  );
};

export default Totals;
