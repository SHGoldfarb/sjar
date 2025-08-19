import { useJarsStaleIndicator } from "@/providers/JarsStaleIndicator";
import { dbUpsertJar } from "@/lib/database/jars";
import { Jar } from "@/lib/database/common";
import { useState } from "react";

export const useUpsertJar = () => {
  const [_, setStaleIndicator] = useJarsStaleIndicator();

  const [isLoading, setIsLoading] = useState(false);

  const upsertJar = async (jar: Jar) => {
    setIsLoading(true);
    const response = await dbUpsertJar(jar);
    setStaleIndicator((prev) => prev + 1);
    setIsLoading(false);
    return response;
  };

  return { isLoading, upsertJar };
};
