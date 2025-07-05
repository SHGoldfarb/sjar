type Transaction = {
  id: number;
  amount: number;
  date: Date;
  type: "income" | "expense" | "transfer";
};

export const useTransactions = (): Transaction[] => {
  return [
    { id: 1, amount: 300, date: new Date(), type: "income" },
    { id: 2, amount: 400, date: new Date(), type: "expense" },
  ];
};
