"use client";

import { Button } from "@/components/ui/button";
import Totals from "./page/Totals";
import Transactions from "./page/Transactions";
import Link from "next/link";

const App = () => {
  return (
    <div className="p-2">
      <Totals />
      <Button asChild className="w-full">
        <Link href={`/transaction/new`}>+</Link>
      </Button>
      <Transactions />
    </div>
  );
};

export default App;
