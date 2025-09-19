import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJars } from "@/hooks/useJars";

export const TransactionJarSelector = ({
  name,
  initialValue: defaultJarId,
}: {
  name?: string;
  initialValue?: number;
}) => {
  const { data: jars } = useJars({ withDeleted: true });
  const availableJars = jars?.filter(
    (jar) => !jar.deletedAt || jar.id === defaultJarId
  );
  return (
    <Select name={name || "jarId"} defaultValue={defaultJarId?.toString()}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Jar" />
      </SelectTrigger>
      <SelectContent>
        {availableJars?.map((jar) => (
          <SelectItem value={`${jar.id}`} key={jar.id}>
            {jar.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
