import Amount from "../components/Amount";
import styles from "./transactionCard.module.css";

const TransactionCard = ({
  transaction,
}: {
  transaction: { amount: number; type: string; date: Date };
}) => {
  return (
    <div className={styles.transactionCardContainer}>
      <div>{transaction.date.toLocaleString()}</div>
      <Amount
        className={styles.amount}
        amount={transaction.amount}
        type={transaction.type}
      />
    </div>
  );
};

export default TransactionCard;
