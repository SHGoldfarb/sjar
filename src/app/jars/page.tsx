"use client";

import { Button } from "@/components/ui/button";
import { CardList } from "@/components/ui/card-list";
import { useJars } from "@/hooks/useJars";
import Link from "next/link";
import React from "react";

const Jars = () => {
  const { data: jars = [] } = useJars();

  return (
    <CardList>
      {jars.map((jar) => (
        <Button key={jar.id} asChild>
          <Link href={`/jar?jarId=${jar.id}`}>{jar.name}</Link>
        </Button>
      ))}
      <Button asChild>
        <Link href={`/jar/new`}>+</Link>
      </Button>
    </CardList>
  );
};

export default Jars;
