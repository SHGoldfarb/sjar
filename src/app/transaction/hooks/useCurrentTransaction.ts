import { useSearchParams } from "next/navigation";
import { useTransaction } from "@/hooks/useTransaction";

export const useCurrentTransaction = () => {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  return useTransaction(Number(transactionId));
};
