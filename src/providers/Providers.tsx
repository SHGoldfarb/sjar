import { ReactNode } from "react";
import { AccountsStaleIndicatorProvider } from "./AccountsStaleIndicator";
import { JarsStaleIndicatorProvider } from "./JarsStaleIndicator";
import { TransactionsStaleIndicatorProvider } from "./TransactionsStaleIndicator";

export const Providers = ({ children }: { children: ReactNode }) => (
  <AccountsStaleIndicatorProvider>
    <JarsStaleIndicatorProvider>
      <TransactionsStaleIndicatorProvider>
        {children}
      </TransactionsStaleIndicatorProvider>
    </JarsStaleIndicatorProvider>
  </AccountsStaleIndicatorProvider>
);
