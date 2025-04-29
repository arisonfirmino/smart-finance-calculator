import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import BanksList from "@/app/components/bank/banks-list";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Prisma } from "@prisma/client";

interface BalanceProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const Balance = ({ user }: BalanceProps) => {
  return (
    <Card className="text-primary-foreground md:text-foreground h-52 w-full max-w-[280px] justify-between gap-2.5 rounded-l-3xl bg-[url('/bg-card.png')] bg-cover shadow-xl md:h-fit md:max-w-full md:justify-normal md:bg-none md:shadow-none">
      <CardHeader className="px-5 pt-5 md:p-0">
        <CardTitle className="md:text-foreground/50 text-primary-foreground/50 text-xs lowercase">
          Saldo disponível
        </CardTitle>
        <p className="text-2xl font-bold">
          {formatCurrency(Number(user.balance))}
        </p>
      </CardHeader>

      <CardFooter className="space-y-1.5 pb-5 md:p-0">
        <CardDescription className="ml-5 text-xs md:ml-0">
          {user.banks.length}{" "}
          {user.banks.length === 1 ? "conta conectada" : "contas conectadas"}
        </CardDescription>

        <BanksList banks={user.banks} />
      </CardFooter>
    </Card>
  );
};

export default Balance;
