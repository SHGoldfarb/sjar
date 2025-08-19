import { useAsync } from "@/hooks/useAsync";
import { dbGetJar } from "@/lib/database/jars";
import { useJarsStaleIndicator } from "@/providers/JarsStaleIndicator";

export const useJar = (id: number) => {
  const [staleIndicator] = useJarsStaleIndicator();

  const { data, isLoading } = useAsync(() => dbGetJar(id), {
    deps: [staleIndicator],
  });

  return { data, isLoading };
};
