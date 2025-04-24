import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";

import UserAvatar from "@/app/components/user-avatar";
import Greeting from "@/app/components/header/greeting";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Separator } from "@/app/components/ui/separator";
import LateralMenu from "@/app/components/menu/lateral-menu";

import { Menu01Icon } from "hugeicons-react";

import { Prisma } from "@prisma/client";

interface HeaderProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-5">
      <div className="flex items-center gap-2.5">
        <UserAvatar user={user} />
        <Greeting user={user} />
      </div>

      <Sheet>
        <SheetTrigger
          className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
        >
          <Menu01Icon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configurações</SheetTitle>
          </SheetHeader>

          <Separator />

          <LateralMenu user={user} />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
