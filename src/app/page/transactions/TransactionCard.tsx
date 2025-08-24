import Amount from "../components/Amount";
import styles from "./transactionCard.module.css";

const TransactionCard = ({
  transaction,
}: {
  transaction: { amount: number; transactionType: string };
}) => {
  return (
    <div className={styles.transactionCardContainer}>
      <div>Date placeholder</div>
      <Amount
        className={styles.amount}
        amount={transaction.amount}
        type={transaction.transactionType}
      />
    </div>
  );
};

export default TransactionCard;
