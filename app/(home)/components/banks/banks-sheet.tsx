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

import { ChevronRightIcon, LandmarkIcon } from "lucide-react";

const BanksSheet = () => {
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
      </SheetContent>
    </Sheet>
  );
};

export default BanksSheet;
