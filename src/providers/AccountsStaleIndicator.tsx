import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const AccountsStaleIndicactor = createContext([
  1 as number,
  ((_value: number) => {}) as Dispatch<SetStateAction<number>>,
] as const);

export const useAccountsStaleIndicator = () =>
  useContext(AccountsStaleIndicactor);

export const AccountsStaleIndicatorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState(1);
  return (
    <AccountsStaleIndicactor.Provider value={[value, setValue]}>
      {children}
    </AccountsStaleIndicactor.Provider>
  );
};
