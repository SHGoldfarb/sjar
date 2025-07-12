const DB_NAME = "AppDatabase";
const DB_VERSION = 1;
export const ACCOUNTS = "accounts";
export const JARS = "jars";
export const TRANSACTIONS = "transactions";

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(ACCOUNTS)) {
        db.createObjectStore(ACCOUNTS, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(JARS)) {
        db.createObjectStore(JARS, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(TRANSACTIONS)) {
        db.createObjectStore(TRANSACTIONS, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

let db: IDBDatabase | null = null;

export const getDatabase = async (): Promise<IDBDatabase> => {
  if (!db) {
    db = await openDatabase();
  }
  return db;
};
