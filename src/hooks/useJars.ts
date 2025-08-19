import { useAsync } from "@/hooks/useAsync";
import { dbGetJars } from "@/lib/database/jars";
import { useJarsStaleIndicator } from "@/providers/JarsStaleIndicator";
import { useMemo } from "react";

export const useJars = (options?: { withDeleted?: boolean }) => {
  const [staleIndicator] = useJarsStaleIndicator();
  const getJars = useMemo(
    () => async () => {
      const jars = await dbGetJars();
      return options?.withDeleted ? jars : jars.filter((jar) => !jar.deletedAt);
    },
    [options?.withDeleted]
  );

  const { data, isLoading } = useAsync(getJars, {
    deps: [staleIndicator],
  });

  return { data, isLoading };
};
