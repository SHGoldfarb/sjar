import { createContext, useCallback, useContext, useState } from "react";

const GlobalState = createContext<
  [
    Record<string, unknown>,
    (value: (value: Record<string, unknown>) => Record<string, unknown>) => void
  ]
>([{}, () => {}]);

export const useGlobalState = <T,>(key: string, initializer: () => T) => {
  const [savedInitialValue] = useState(initializer());
  const [globalState, setGlobalState] = useContext(GlobalState);

  const getCurrentValue = useCallback(
    (currentGlobalState: Record<string, unknown>) =>
      Object.keys(currentGlobalState).includes(key)
        ? (currentGlobalState[key] as T)
        : savedInitialValue,
    [key, savedInitialValue]
  );
  const updateState = useCallback(
    (valueMaybeUpdater: ((prevValue: T) => T) | T) => {
      if (typeof valueMaybeUpdater === "function") {
        // Assume it's an updater. If it's not, it's the caller's fault
        const updater = valueMaybeUpdater as (prevValue: T) => T;
        setGlobalState((prevState) => ({
          ...prevState,
          [key]: updater(getCurrentValue(prevState)),
        }));
      } else {
        setGlobalState((prevState) => ({
          ...prevState,
          [key]: valueMaybeUpdater,
        }));
      }
    },
    [key, setGlobalState, getCurrentValue]
  );

  return [getCurrentValue(globalState), updateState] as const;
};

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState({});
  return (
    <GlobalState.Provider value={[value, setValue]}>
      {children}
    </GlobalState.Provider>
  );
};
