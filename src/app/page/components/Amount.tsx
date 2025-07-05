import { CLP } from "./amount/currency";
import styles from "./amount.module.css";

const Amount = ({
  amount,
  type,
  className,
}: {
  amount: number;
  type: "income" | "expense" | string;
  className?: string;
}) => {
  return (
    <div className={[styles[type], className].join(" ")}>{CLP(amount)}</div>
  );
};

export default Amount;
