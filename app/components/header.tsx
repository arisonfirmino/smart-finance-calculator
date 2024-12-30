import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import TransactionsWrapper from "@/app/components/transactions-wrapper";

import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between p-5 md:justify-center">
      <div className="flex items-center gap-2.5">
        <Image
          src="/SFC logo.png"
          alt="Smart Finance Calculator"
          height={0}
          width={0}
          sizes="100vw"
          className="h-10 w-10"
          style={{ objectFit: "contain" }}
        />
        <h1 className="hidden text-xl font-bold md:flex">
          Smart Finance Calculator
        </h1>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <VisuallyHidden>
              <SheetTitle>Transações</SheetTitle>
            </VisuallyHidden>
            <TransactionsWrapper />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
