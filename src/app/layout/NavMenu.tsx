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
      <NavigationMenuList className="w-screen grid grid-cols-3">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/"} className="text-center">
              Transactions
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/accounts"} className="text-center">
              Accounts
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/jars"} className="text-center">
              Jars
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
