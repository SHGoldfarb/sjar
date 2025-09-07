import Amount from "../../../components/Amount";
import React from "react";

const BaseTransactionCard = ({
  dateIso,
  firstDetail,
  secondDetail,
  detailsSeparator = "-",
  amount,
  amountColor,
}: {
  dateIso: string;
  firstDetail: React.ReactNode;
  secondDetail: React.ReactNode;
  amount: number;
  amountColor?: "income" | "expense";
  detailsSeparator?: React.ReactNode;
}) => {
  const dateLocale = new Date(dateIso).toLocaleString();
  return (
    <div className="flex py-3 px-1">
      <div>
        {dateLocale}
        <div className="flex display-column gap-4">
          <div key="first">{firstDetail}</div>
          {detailsSeparator}
          <div key="seond">{secondDetail}</div>
        </div>
      </div>

      <Amount className="ml-auto" amount={amount} type={amountColor} />
    </div>
  );
};

export default BaseTransactionCard;
