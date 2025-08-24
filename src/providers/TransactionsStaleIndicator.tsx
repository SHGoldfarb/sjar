import { createStaleIndicator } from "./utils/staleIndicators";

const {
  useStaleIndicator: useTransactionsStaleIndicator,
  StaleIndicatorProvider: TransactionsStaleIndicatorProvider,
} = createStaleIndicator();

export { TransactionsStaleIndicatorProvider, useTransactionsStaleIndicator };
