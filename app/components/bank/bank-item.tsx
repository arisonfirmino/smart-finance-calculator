import { Card, CardHeader, CardFooter } from "@/app/components/ui/card";
import ChipIcon from "@/app/components/bank/chip-icon";
import BankBadge from "@/app/components/bank/bank-badge";

const BankItem = () => {
  const bank = {
    name: "Itaú",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/95/b7/5b/95b75bba-ef31-d06d-0beb-9aebd0cdb175/Varejo-AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/246x0w.webp",
  };

  return (
    <Card className="h-14 w-20 justify-between rounded-sm bg-[url('/bg-card.png')] bg-cover bg-center bg-no-repeat shadow">
      <CardHeader className="flex items-center justify-between p-1">
        <ChipIcon />
        <BankBadge bank={bank} />
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
