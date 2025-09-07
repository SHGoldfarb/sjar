import { useAsync } from "@/hooks/useAsync";
import { dbGetJar } from "@/lib/database/jars";
import { useJarsStaleIndicator } from "@/providers/JarsStaleIndicator";
import { useMemo } from "react";

export const useJar = (id: number) => {
  const [staleIndicator] = useJarsStaleIndicator();

  const { data, isLoading } = useAsync(
    useMemo(() => () => dbGetJar(id), [id]),
    {
      deps: [staleIndicator],
    }
  );

  return { data, isLoading };
};
