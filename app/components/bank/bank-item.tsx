import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import ChipIcon from "@/app/components/bank/chip-icon";
import BankBadge from "@/app/components/bank/bank-badge";

import { Bank } from "@prisma/client";
import { formatCurrency } from "@/app/helpers/formatCurrency";

interface BankItemProps {
  bank: Bank;
}

const BankItem = ({ bank }: BankItemProps) => {
  return (
    <Card className="h-14 w-20 justify-between rounded-sm bg-[url('/bg-card.png')] bg-cover bg-center bg-no-repeat shadow">
      <CardHeader className="flex items-center justify-between p-1">
        <ChipIcon />
        <BankBadge bank={bank} />
      </CardHeader>
      <CardFooter className="px-1.5 py-0.5">
        <p className="text-foreground/70 truncate text-[10px] font-medium">
          {formatCurrency(Number(bank.current_value))}
        </p>
      </CardFooter>
    </Card>
  );
};

export default BankItem;
