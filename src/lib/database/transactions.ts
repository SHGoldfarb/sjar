import { memoizeWithDataVersion } from "../utils";
import {
  Transaction,
  dbDelete,
  dbGet,
  dbGetAll,
  dbUpsert,
  BaseTransaction,
  ExpenseTransaction,
  IncomeTransaction,
  AccountsTransaction,
  JarsTransaction,
} from "./common";
import { TRANSACTIONS } from "./db";

const baseTransactionCast = (data: unknown): BaseTransaction | undefined => {
  if (
    !data ||
    typeof data !== "object" ||
    !("type" in data) ||
    !("amount" in data) ||
    !("dateIso" in data)
  ) {
    return;
  }

  const { type, amount, dateIso } = data;

  if (
    type !== "transaction" ||
    typeof amount !== "number" ||
    typeof dateIso !== "string"
  ) {
    return;
  }

  return {
    ...data,
    type,
    amount,
    dateIso,
  };
};

const expenseTransactionCast = (
  baseTransaction: BaseTransaction
): ExpenseTransaction | undefined => {
  if (
    !("transactionType" in baseTransaction) ||
    !("accountId" in baseTransaction) ||
    !("jarId" in baseTransaction)
  ) {
    return;
  }

  const { transactionType, accountId, jarId } = baseTransaction;

  if (
    transactionType !== "expense" ||
    typeof accountId !== "number" ||
    typeof jarId !== "number"
  ) {
    return;
  }

  return { ...baseTransaction, transactionType, accountId, jarId };
};

const incomeTransactionCast = (
  baseTransaction: BaseTransaction
): IncomeTransaction | undefined => {
  if (
    !("transactionType" in baseTransaction) ||
    !("accountId" in baseTransaction) ||
    !("jarId" in baseTransaction)
  ) {
    return;
  }

  const { transactionType, accountId, jarId } = baseTransaction;

  if (
    transactionType !== "income" ||
    typeof accountId !== "number" ||
    typeof jarId !== "number"
  ) {
    return;
  }

  return { ...baseTransaction, transactionType, accountId, jarId };
};

const accountsTransactionCast = (
  baseTransaction: BaseTransaction
): AccountsTransaction | undefined => {
  if (
    !("transactionType" in baseTransaction) ||
    !("originAccountId" in baseTransaction) ||
    !("destinationAccountId" in baseTransaction)
  ) {
    return;
  }

  const { transactionType, originAccountId, destinationAccountId } =
    baseTransaction;

  if (
    transactionType !== "accounts" ||
    typeof originAccountId !== "number" ||
    typeof destinationAccountId !== "number"
  ) {
    return;
  }

  return {
    ...baseTransaction,
    transactionType,
    originAccountId,
    destinationAccountId,
  };
};

const jarsTransactionCast = (
  baseTransaction: BaseTransaction
): JarsTransaction | undefined => {
  if (
    !("transactionType" in baseTransaction) ||
    !("originJarId" in baseTransaction) ||
    !("destinationJarId" in baseTransaction)
  ) {
    return;
  }

  const { transactionType, originJarId, destinationJarId } = baseTransaction;

  if (
    transactionType !== "jars" ||
    typeof originJarId !== "number" ||
    typeof destinationJarId !== "number"
  ) {
    return;
  }

  return {
    ...baseTransaction,
    transactionType,
    originJarId,
    destinationJarId,
  };
};

const transactionCast = (data: unknown) => {
  const baseTransaction = baseTransactionCast(data);
  if (!baseTransaction) {
    return;
  }
  return (
    expenseTransactionCast(baseTransaction) ||
    incomeTransactionCast(baseTransaction) ||
    accountsTransactionCast(baseTransaction) ||
    jarsTransactionCast(baseTransaction)
  );
};

export const isTransactionValid = (transaction: Transaction) => {
  if (isNaN(transaction.amount)) {
    return false;
  }

  if (
    transaction.transactionType === "income" ||
    transaction.transactionType === "expense"
  ) {
    if (isNaN(transaction.accountId) || isNaN(transaction.jarId)) {
      return false;
    }
  }

  if (transaction.transactionType === "jars") {
    if (isNaN(transaction.originJarId) || isNaN(transaction.destinationJarId)) {
      return false;
    }
  }

  if (transaction.transactionType === "accounts") {
    if (
      isNaN(transaction.originAccountId) ||
      isNaN(transaction.destinationAccountId)
    ) {
      return false;
    }
  }
  return true;
};

let dataVersion = 1;

export const dbUpsertTransaction = async (transaction: Transaction) => {
  const response = await dbUpsert(transaction, TRANSACTIONS);
  dataVersion += 1;
  return response;
};

export const dbDeleteTransaction = async (id: number) => {
  const response = await dbDelete(id, TRANSACTIONS);
  dataVersion += 1;
  return response;
};

const getTransactionsNoCache = async () => {
  const transactions = await dbGetAll(TRANSACTIONS);
  return transactions
    .map((transaction) => transactionCast(transaction))
    .filter((transaction) => transaction && isTransactionValid(transaction))
    .filter((transaction) => !!transaction);
};

export const dbGetTransactions = memoizeWithDataVersion(
  getTransactionsNoCache,
  () => dataVersion
);

const getTransactionNoCache = async (id: number) => {
  const transaction = transactionCast(await dbGet(id, TRANSACTIONS));
  return transaction && isTransactionValid(transaction)
    ? transaction
    : undefined;
};

export const dbGetTransaction = memoizeWithDataVersion(
  getTransactionNoCache,
  () => dataVersion
);
