import { memoizeWithDataVersion } from "../utils";
import { Jar, dbDelete, dbGet, dbGetAll, dbUpsert } from "./common";
import { JARS } from "./db";

let dataVersion = 1;

export const dbUpsertJar = async (jar: Jar) => {
  const response = await dbUpsert(jar, JARS);
  dataVersion += 1;
  return response;
};

export const dbDeleteJar = async (id: number) => {
  const response = await dbDelete(id, JARS);
  dataVersion += 1;
  return response;
};

const getJarsNoCache = () => dbGetAll(JARS);

export const dbGetJars = memoizeWithDataVersion(
  getJarsNoCache,
  () => dataVersion
);

const getJarNoCache = (id: number) => dbGet(id, JARS);

export const dbGetJar = memoizeWithDataVersion(
  getJarNoCache,
  () => dataVersion
);
