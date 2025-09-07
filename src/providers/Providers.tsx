import { ReactNode } from "react";
import { AccountsStaleIndicatorProvider } from "./AccountsStaleIndicator";
import { JarsStaleIndicatorProvider } from "./JarsStaleIndicator";
import { TransactionsStaleIndicatorProvider } from "./TransactionsStaleIndicator";
import { GlobalStateProvider } from "./GlobalState";

export const Providers = ({ children }: { children: ReactNode }) => (
  <AccountsStaleIndicatorProvider>
    <JarsStaleIndicatorProvider>
      <TransactionsStaleIndicatorProvider>
        <GlobalStateProvider>{children}</GlobalStateProvider>
      </TransactionsStaleIndicatorProvider>
    </JarsStaleIndicatorProvider>
  </AccountsStaleIndicatorProvider>
);
