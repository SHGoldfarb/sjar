import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const TransactionDateInput = ({
  initialValue = new Date(),
}: {
  initialValue?: Date;
}) => {
  const [date, setDate] = React.useState<Date>(initialValue);

  return (
    <Popover>
      <input type="hidden" value={date?.toISOString()} name="date" />
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal w-full"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} required />
      </PopoverContent>
    </Popover>
  );
};
