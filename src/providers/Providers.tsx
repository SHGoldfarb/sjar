import { ReactNode } from "react";
import { AccountsStaleIndicatorProvider } from "./AccountsStaleIndicator";
import { JarsStaleIndicatorProvider } from "./JarsStaleIndicator";

export const Providers = ({ children }: { children: ReactNode }) => (
  <AccountsStaleIndicatorProvider>
    <JarsStaleIndicatorProvider>{children}</JarsStaleIndicatorProvider>
  </AccountsStaleIndicatorProvider>
);
