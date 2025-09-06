import { memoizeWithDataVersion } from "../utils";
import { Jar, dbDelete, dbGet, dbGetAll, dbUpsert } from "./common";
import { JARS } from "./db";

const jarCast = (data: unknown): Jar | undefined => {
  if (!data || typeof data !== "object" || !("type" in data)) {
    return;
  }

  const type = data.type;

  if (type !== "jar") {
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

const getJarsNoCache = async () => {
  const jars = await dbGetAll(JARS);
  return jars.map((jar) => jarCast(jar)).filter((jar) => !!jar);
};

export const dbGetJars = memoizeWithDataVersion(
  getJarsNoCache,
  () => dataVersion
);

const getJarNoCache = async (id: number) => {
  const jar = await dbGet(id, JARS);
  return jarCast(jar);
};

export const dbGetJar = memoizeWithDataVersion(
  getJarNoCache,
  () => dataVersion
);
