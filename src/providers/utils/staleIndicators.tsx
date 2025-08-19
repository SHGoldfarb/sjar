import { createContext, useContext, useState } from "react";

export const createStaleIndicator = () => {
  const StaleIndicactor = createContext<
    [number, (value: number | ((value: number) => number)) => void]
  >([1, () => {}]);

  const useStaleIndicator = () => useContext(StaleIndicactor);

  const StaleIndicatorProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [value, setValue] = useState(1);
    return (
      <StaleIndicactor.Provider value={[value, setValue]}>
        {children}
      </StaleIndicactor.Provider>
    );
  };

  return { useStaleIndicator, StaleIndicatorProvider };
};
