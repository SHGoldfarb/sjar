import { useEffect, useState } from "react";

export const useAsync = <T extends () => Promise<unknown>>(
  asyncFunction: T,
  options?: { deps?: unknown[] }
) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Awaited<ReturnType<T>> | undefined>(
    undefined
  );

  useEffect(() => {
    asyncFunction().then((result) => {
      setData(result as Awaited<ReturnType<T>>);
      setLoading(false);
    });
  }, [asyncFunction, ...(options?.deps || [])]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, isLoading };
};
