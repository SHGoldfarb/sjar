import { Transaction } from "@/lib/database/common";
import Amount from "../components/Amount";
import styles from "./transactionCard.module.css";

const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const dateLocale = new Date(transaction.dateIso).toLocaleString();
  return (
    <div className={styles.transactionCardContainer}>
      <div>{dateLocale}</div>
      <Amount
        className={styles.amount}
        amount={transaction.amount}
        type={transaction.transactionType}
      />
    </div>
  );
};

export default TransactionCard;
