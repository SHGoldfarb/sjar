import { dbGetJar } from "@/lib/database/jars";
import { useJarsStaleIndicator } from "@/providers/JarsStaleIndicator";
import { useMemo } from "react";
import { useQuery } from "./useQuery";

export const useJar = (id: number) => {
  const [staleIndicator] = useJarsStaleIndicator();

  const { data, isLoading } = useQuery(
    useMemo(() => () => dbGetJar(id), [id]),
    {
      key: ["useJar", id, staleIndicator],
    }
  );

  return { data, isLoading };
};
