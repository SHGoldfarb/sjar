import { ACCOUNTS, getDatabase, JARS, TRANSACTIONS } from "./db";

type BaseItem = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type Account = BaseItem & {
  name?: string;
  type: "account";
};

export type Jar = BaseItem & {
  name?: string;
  type: "jar";
};

export type BaseTransaction = BaseItem & {
  amount: number;
  type: "transaction";
  dateIso: string;
};

export type ExpenseTransaction = BaseTransaction & {
  transactionType: "expense";
  accountId: number;
  jarId: number;
};

export type IncomeTransaction = BaseTransaction & {
  transactionType: "income";
  accountId: number;
  jarId: number;
};

export type AccountsTransaction = BaseTransaction & {
  transactionType: "accounts";
  originAccountId: number;
  destinationAccountId: number;
};

export type JarsTransaction = BaseTransaction & {
  transactionType: "jars";
  originJarId: number;
  destinationJarId: number;
};

export type Transaction =
  | ExpenseTransaction
  | IncomeTransaction
  | AccountsTransaction
  | JarsTransaction;

export const dbUpsert = async (
  item: Account | Jar | Transaction,
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
) => {
  const db = await getDatabase();
  return new Promise<number>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);
    request.onsuccess = () => {
      if (typeof request.result != "number") {
        throw new TypeError(
          `Unexpected type of ${
            request.result
          }: ${typeof request.result}, expected: ${"number"}`
        );
      }
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const dbDelete = async (
  id: number,
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
) => {
  const db = await getDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const dbGetAll = async (
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
) => {
  const db = await getDatabase();
  return new Promise<unknown[]>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const dbGet = async (
  id: number,
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
) => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};
