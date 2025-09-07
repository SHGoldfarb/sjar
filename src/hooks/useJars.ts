import { dbGetJars } from "@/lib/database/jars";
import { useJarsStaleIndicator } from "@/providers/JarsStaleIndicator";
import { useQuery } from "./useQuery";

export const useJars = (options?: { withDeleted?: boolean }) => {
  const [staleIndicator] = useJarsStaleIndicator();
  const getJars = async () => {
    const jars = await dbGetJars();
    return options?.withDeleted ? jars : jars.filter((jar) => !jar.deletedAt);
  };

  const { data, isLoading } = useQuery(getJars, {
    key: ["useJars", options, staleIndicator],
  });

  return { data, isLoading };
};
