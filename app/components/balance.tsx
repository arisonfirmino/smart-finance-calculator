import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import BanksList from "@/app/components/banks-list";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { User } from "@/app/types";

const Balance = ({ user }: { user: User }) => {
  const bankCount = user.banks.length;

  return (
    <Card className="text-primary-foreground md:text-foreground h-52 w-full max-w-2/3 justify-between gap-2.5 rounded-l-4xl bg-[url('/bg-card.png')] bg-cover shadow-md md:h-fit md:max-w-fit md:justify-normal md:rounded-none md:bg-none md:shadow-none">
      <CardHeader className="p-5 md:p-0">
        <CardTitle className="text-sm font-normal lowercase opacity-60">
          Saldo Disponível
        </CardTitle>

        <p className="text-2xl font-bold">
          {formatCurrency(Number(user.balance))}
        </p>
      </CardHeader>

      <CardFooter className="gap-1.5 pb-5 md:p-0">
        <CardDescription className="ml-5 text-xs lowercase md:m-0">
          {bankCount > 0
            ? `${bankCount} ${bankCount === 1 ? "banco cadastrado" : "bancos cadastrados"}`
            : "Nenhum banco conectado"}
        </CardDescription>
        {bankCount > 0 && <BanksList banks={user.banks} />}
      </CardFooter>
    </Card>
  );
};

export default Balance;
