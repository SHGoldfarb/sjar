import { useTransactions } from "@/hooks/useTransactions";
import TransactionCard from "./transactions/TransactionCard";

const Transactions = () => {
  const { data: transactions = [] } = useTransactions();

  return (
    <div>
      {transactions.map((t) => (
        <TransactionCard transaction={t} key={t.id} />
      ))}
    </div>
  );
};

export default Transactions;
