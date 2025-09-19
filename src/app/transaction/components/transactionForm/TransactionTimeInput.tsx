import * as React from "react";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";

export const TransactionTimeInput = ({
  initialValue = new Date(),
}: {
  initialValue?: Date;
}) => {
  return (
    <Input
      type="time"
      name="time"
      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      step="1"
      defaultValue={format(initialValue, "HH:mm:ss")}
    />
  );
};
