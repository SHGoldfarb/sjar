import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJars } from "@/hooks/useJars";

export const TransactionJarSelector = ({ name }: { name?: string }) => {
  const { data: jars } = useJars();
  return (
    <Select name={name || "jarId"}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Jar" />
      </SelectTrigger>
      <SelectContent>
        {jars?.map((jar) => (
          <SelectItem value={`${jar.id}`} key={jar.id}>
            {jar.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
