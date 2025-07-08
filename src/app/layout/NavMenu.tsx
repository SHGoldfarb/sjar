"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NavMenu = () => {
  return (
    <NavigationMenu className="fixed bottom-0 left-0 max-w-none">
      <NavigationMenuList className="justify-evenly w-screen">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/"}>Transactions</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/accounts"}>Accounts</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/jars"}>Jars</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
