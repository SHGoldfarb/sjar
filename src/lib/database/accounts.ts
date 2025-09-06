import { memoizeWithDataVersion } from "../utils";
import { Account, dbDelete, dbGet, dbGetAll, dbUpsert } from "./common";
import { ACCOUNTS } from "./db";

const accountCast = (data: unknown): Account | undefined => {
  if (!data || typeof data !== "object" || !("type" in data)) {
    return;
  }

  const type = data.type;

  if (type !== "account") {
    return;
  }

  const name = "name" in data ? data.name : undefined;

  if (typeof name !== "string") {
    return;
  }

  return {
    ...data,
    type,
    name,
  };
};

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

const getAccountsNoCache = async () => {
  const accounts = await dbGetAll(ACCOUNTS);
  return accounts
    .map((account) => accountCast(account))
    .filter((account) => !!account);
};

export const dbGetAccounts = memoizeWithDataVersion(
  getAccountsNoCache,
  () => dataVersion
);

const getAccountNoCache = async (id: number) => {
  const account = await dbGet(id, ACCOUNTS);
  return accountCast(account);
};

export const dbGetAccount = memoizeWithDataVersion(
  getAccountNoCache,
  () => dataVersion
);
