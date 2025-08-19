import { createStaleIndicator } from "./utils/staleIndicators";

const {
  useStaleIndicator: useJarsStaleIndicator,
  StaleIndicatorProvider: JarsStaleIndicatorProvider,
} = createStaleIndicator();

export { JarsStaleIndicatorProvider, useJarsStaleIndicator };
