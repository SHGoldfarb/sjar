import { memoizeWithDataVersion } from "../utils";
import { Account, dbDelete, dbGet, dbGetAll, dbUpsert } from "./common";
import { ACCOUNTS } from "./db";

let dataVersion = 1;

export const dbUpsertAccount = async (account: Account) => {
  const response = await dbUpsert(account, ACCOUNTS);
  dataVersion += 1;
  return response;
};

export const dbDeleteAccount = async (id: number) => {
  const response = await dbDelete(id, ACCOUNTS);
  dataVersion += 1;
  return response;
};

const getAccountsNoCache = () => dbGetAll(ACCOUNTS);

export const dbGetAccounts = memoizeWithDataVersion(
  getAccountsNoCache,
  () => dataVersion
);

const getAccountNoCache = async (id: number) => dbGet(id, ACCOUNTS);

export const dbGetAccount = memoizeWithDataVersion(
  getAccountNoCache,
  () => dataVersion
);
