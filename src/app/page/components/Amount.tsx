import clsx from "clsx";
import { CLP } from "./amount/currency";

const Amount = ({
  amount,
  type,
  className,
}: {
  amount: number;
  type?: "income" | "expense";
  className?: string;
}) => {
  const colors = {
    income: "text-blue-400",
    expense: "text-red-400",
  };
  return (
    <div className={clsx(className, type && colors[type])}>{CLP(amount)}</div>
  );
};

export default Amount;
