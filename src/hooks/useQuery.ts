import { useGlobalState } from "@/providers/GlobalState";
import { useEffect } from "react";

export const useQuery = <T>(
  asyncFunction: () => Promise<T>,
  options: { key: unknown[] }
) => {
  const baseKey = JSON.stringify(options.key);
  const [{ startedLoading, finishedLoading, data }, setState] = useGlobalState(
    baseKey,
    () => ({
      startedLoading: false,
      finishedLoading: false,
      data: undefined as undefined | T,
    })
  );

  useEffect(() => {
    if (!startedLoading) {
      setState((prevState) => ({ ...prevState, startedLoading: true }));
      asyncFunction().then((result) => {
        setState((prevData) => ({
          ...prevData,
          finishedLoading: true,
          data: result,
        }));
      });
    }
  }, [startedLoading, asyncFunction, setState]);

  return { data, isLoading: !finishedLoading };
};
