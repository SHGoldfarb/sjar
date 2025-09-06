import { Transaction } from "@/lib/database/common";

export const parseTransactionFormData = (
  formData: FormData
): Transaction | undefined => {
  const dateRaw = formData.get("date");
  const timeRaw = formData.get("time");
  const amountRaw = formData.get("amount");
  const transactionType = formData.get("transactionType");
  const accountId = formData.get("accountId");
  const jarId = formData.get("jarId");
  const originAccountId = formData.get("originAccountId");
  const destinationAccountId = formData.get("destinationAccountId");
  const originJarId = formData.get("originJarId");
  const destinationJarId = formData.get("destinationJarId");

  console.log("parsing", {
    amountRaw,
    dateRaw,
    timeRaw,
    transactionType,
    accountId,
    jarId,
    originAccountId,
    destinationAccountId,
    originJarId,
    destinationJarId,
  });

  if (
    typeof amountRaw !== "string" ||
    typeof dateRaw !== "string" ||
    typeof timeRaw !== "string"
  ) {
    return;
  }

  const amount = parseInt(amountRaw, 10);
  const date = new Date(dateRaw);
  const [hours, minutes, seconds] = timeRaw.split(":").map((v) => parseInt(v));
  date.setHours(hours, minutes, seconds);
  const dateIso = date.toISOString();

  if (transactionType === "expense" || transactionType === "income") {
    if (typeof accountId !== "string" || typeof jarId !== "string") {
      return;
    }
    return {
      type: "transaction",
      amount,
      dateIso,
      transactionType,
      accountId: parseInt(accountId, 10),
      jarId: parseInt(jarId, 10),
    };
  } else if (transactionType === "accounts") {
    if (
      typeof originAccountId !== "string" ||
      typeof destinationAccountId !== "string"
    ) {
      return;
    }
    return {
      type: "transaction",
      amount,
      dateIso,
      transactionType,
      originAccountId: parseInt(originAccountId, 10),
      destinationAccountId: parseInt(destinationAccountId, 10),
    };
  } else if (transactionType === "jars") {
    if (
      typeof originJarId !== "string" ||
      typeof destinationJarId !== "string"
    ) {
      return;
    }
    return {
      type: "transaction",
      amount,
      dateIso,
      transactionType,
      originJarId: parseInt(originJarId, 10),
      destinationJarId: parseInt(destinationJarId, 10),
    };
  }
};
