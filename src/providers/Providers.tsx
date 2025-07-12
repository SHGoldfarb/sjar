import { ReactNode } from "react";
import { AccountsStaleIndicatorProvider } from "./AccountsStaleIndicator";

export const Providers = ({ children }: { children: ReactNode }) => (
  <AccountsStaleIndicatorProvider>{children}</AccountsStaleIndicatorProvider>
);
