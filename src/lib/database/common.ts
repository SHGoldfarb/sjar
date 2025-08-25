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

export async function dbUpsert(
  item: Account,
  storeName: typeof ACCOUNTS
): Promise<number>;
export async function dbUpsert(
  item: Jar,
  storeName: typeof JARS
): Promise<number>;
export async function dbUpsert(
  item: Transaction,
  storeName: typeof TRANSACTIONS
): Promise<number>;
export async function dbUpsert(
  item: Account | Jar | Transaction,
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

export const dbDelete = async (
  id: number,
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
): Promise<void> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
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

export async function dbGetAll(storeName: typeof ACCOUNTS): Promise<Account[]>;
export async function dbGetAll(storeName: typeof JARS): Promise<Jar[]>;
export async function dbGetAll(
  storeName: typeof TRANSACTIONS
): Promise<Transaction[]>;
export async function dbGetAll(
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
) {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
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
}

export async function dbGet(
  id: number,
  storeName: typeof ACCOUNTS
): Promise<Account>;
export async function dbGet(id: number, storeName: typeof JARS): Promise<Jar>;
export async function dbGet(
  id: number,
  storeName: typeof TRANSACTIONS
): Promise<Transaction>;
export async function dbGet(
  id: number,
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
) {
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
}
