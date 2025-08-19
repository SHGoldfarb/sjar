import React, { ReactNode } from "react";

export const CardList = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4 p-4">{children}</div>;
};
