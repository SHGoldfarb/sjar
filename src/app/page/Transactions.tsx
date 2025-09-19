import { useTransactions } from "@/hooks/useTransactions";
import TransactionCard from "./transactions/TransactionCard";
import Link from "next/link";

const Transactions = () => {
  const { data: transactions = [] } = useTransactions();

  return (
    <div>
      {transactions.map((t) => (
        <Link href={`/transaction?transactionId=${t.id}`} key={t.id}>
          <TransactionCard transaction={t} />
        </Link>
      ))}
    </div>
  );
};

export default Transactions;
