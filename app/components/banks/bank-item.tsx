import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import ChipIcon from "@/app/components/banks/chip-icon";
import BankBadge from "@/app/components/banks/bank-badge";

const BankItem = () => {
  return (
    <Card className="h-14 w-20 justify-between rounded-sm bg-[url('/bg-card.png')] bg-cover bg-center bg-no-repeat shadow">
      <CardHeader className="flex items-center justify-between p-1">
        <ChipIcon />
        <BankBadge />
      </CardHeader>
      <CardFooter className="px-1.5 py-0.5">
        <p className="text-foreground/70 truncate text-[10px] font-medium">
          R$ 12.500,00
        </p>
      </CardFooter>
    </Card>
  );
};

export default BankItem;
