import { createStaleIndicator } from "./utils/staleIndicators";

const {
  useStaleIndicator: useAccountsStaleIndicator,
  StaleIndicatorProvider: AccountsStaleIndicatorProvider,
} = createStaleIndicator();

export { AccountsStaleIndicatorProvider, useAccountsStaleIndicator };
