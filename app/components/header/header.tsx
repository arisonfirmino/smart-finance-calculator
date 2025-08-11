"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import Search from "@/app/components/header/search";
import UserGreeting from "@/app/components/header/user-greeting";

import LateralMenu from "@/app/components/header/lateral-menu";

import { MenuIcon } from "lucide-react";

import { User } from "@/app/types";

const Header = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background relative flex w-full xl:h-screen xl:max-w-xs xl:flex-col xl:border-r">
      <div className="flex w-full items-center justify-between p-5 xl:hidden">
        <UserGreeting user={user} />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
          >
            <MenuIcon />
          </SheetTrigger>

          <SheetContent>
            <SheetTitle className="hidden">Configurações</SheetTitle>
            <LateralMenu user={user} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
      </div>

      <Search user={user} />

      <div className="hidden flex-1 xl:flex">
        <LateralMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
