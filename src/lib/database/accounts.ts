import { memoize } from "../utils";
import { ACCOUNTS, getDatabase } from "./common";

let dataVersion = 1;

export type Account = {
  id?: number;
  name?: string;
};

export const dbUpsertAccount = async (account: Account): Promise<number> => {
  dataVersion += 1;
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ACCOUNTS, "readwrite");
    const store = transaction.objectStore(ACCOUNTS);
    const request = store.put(account);
    request.onsuccess = () => {
      resolve(request.result as number);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const dbDeleteAccount = async (id: number): Promise<void> => {
  dataVersion += 1;
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ACCOUNTS, "readwrite");
    const store = transaction.objectStore(ACCOUNTS);
    const request = store.delete(id);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

const getAccountsNoCache = async (): Promise<Account[]> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ACCOUNTS, "readonly");
    const store = transaction.objectStore(ACCOUNTS);
    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

const getAccountsNoCacheMemoized = memoize((_args: { dataVersion: number }) => {
  return getAccountsNoCache();
});

export const dbGetAccounts = () => {
  return getAccountsNoCacheMemoized({ dataVersion });
};

const getAccountNoCache = async (id: number): Promise<Account | undefined> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ACCOUNTS, "readonly");
    const store = transaction.objectStore(ACCOUNTS);
    const request = store.get(id);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

const getAccountNoCacheMemoized = memoize(
  (
    _args: { dataVersion: number },
    ...rest: Parameters<typeof getAccountNoCache>
  ) => {
    return getAccountNoCache(...rest);
  }
);

export const dbGetAccount = (...args: Parameters<typeof getAccountNoCache>) => {
  return getAccountNoCacheMemoized({ dataVersion }, ...args);
};
