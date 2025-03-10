import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";
import BanksList from "@/app/(home)/components/banks/banks-list";

import { ChevronRightIcon, LandmarkIcon } from "lucide-react";

import { Bank } from "@prisma/client";

interface BanksSheetProps {
  banks: Bank[];
}

const BanksSheet = ({ banks }: BanksSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-between border-none",
        )}
      >
        <span className="flex items-center gap-2">
          <LandmarkIcon size={16} />
          Minhas contas
        </span>

        <ChevronRightIcon size={16} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Contas Registradas</SheetTitle>
          <SheetDescription>
            Veja os detalhes das suas contas bancárias registradas.
          </SheetDescription>
        </SheetHeader>

        {banks.length > 0 ? (
          <BanksList banks={banks} />
        ) : (
          <p className="text-muted-foreground text-center text-sm">
            Você ainda não registrou nenhuma conta.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BanksSheet;
