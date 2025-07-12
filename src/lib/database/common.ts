import { ACCOUNTS, getDatabase, JARS, TRANSACTIONS } from "./db";

export type Account = {
  id?: number;
  name?: string;
  type: "account";
};

export type Jar = {
  id?: number;
  name?: string;
  type: "jar";
};

export type Transaction = {
  id?: number;
  amount?: number;
  type: "transaction";
};

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
): Promise<number> {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);
    request.onsuccess = () => {
      resolve(request.result as number);
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
): Promise<Account[] | Jar[] | Transaction[]> {
  const db = await getDatabase();
  return new Promise<Account[] | Transaction[] | Jar[]>((resolve, reject) => {
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
): Promise<Account | undefined>;
export async function dbGet(
  id: number,
  storeName: typeof JARS
): Promise<Jar | undefined>;
export async function dbGet(
  id: number,
  storeName: typeof TRANSACTIONS
): Promise<Transaction | undefined>;
export async function dbGet(
  id: number,
  storeName: typeof ACCOUNTS | typeof JARS | typeof TRANSACTIONS
): Promise<Account | Jar | Transaction | undefined> {
  const db = await getDatabase();
  return new Promise<Account | Jar | Transaction | undefined>(
    (resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    }
  );
}
