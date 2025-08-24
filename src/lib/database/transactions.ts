import { memoizeWithDataVersion } from "../utils";
import { Transaction, dbDelete, dbGet, dbGetAll, dbUpsert } from "./common";
import { TRANSACTIONS } from "./db";

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

const getTransactionsNoCache = () => dbGetAll(TRANSACTIONS);

export const dbGetTransactions = memoizeWithDataVersion(
  getTransactionsNoCache,
  () => dataVersion
);

const getTransactionNoCache = (id: number) => dbGet(id, TRANSACTIONS);

export const dbGetTransaction = memoizeWithDataVersion(
  getTransactionNoCache,
  () => dataVersion
);
