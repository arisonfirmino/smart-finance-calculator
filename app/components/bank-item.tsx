import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import BankIcon from "@/app/components/bank-icon";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Bank } from "@/app/types";

const BankItem = ({ bank }: { bank: Bank }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:bg-foreground/5 text-primary-foreground md:text-foreground bg-background/20 flex-row gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium">
        <BankIcon bank={bank} size="size-3" />
        {formatCurrency(Number(bank.current_balance))}
      </SheetTrigger>

      <SheetContent
        side="top"
        className="w-full border-none bg-transparent p-5 shadow-none md:max-w-sm"
      >
        <div className="bg-background rounded-3xl shadow-lg">
          <SheetHeader>
            <SheetTitle>{bank.name}</SheetTitle>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BankItem;
