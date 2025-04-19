import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Prisma } from "@prisma/client";
import BanksList from "./bank/banks-list";

interface BalanceProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const Balance = ({ user }: BalanceProps) => {
  return (
    <Card
      className="h-52 w-full max-w-[280px] justify-between rounded-l-3xl bg-[url('/bg-card.png')] bg-cover text-white"
      style={{ boxShadow: "30px 10px 10px rgba(0, 0, 0, 0.20)" }}
    >
      <CardHeader className="px-5 pt-5">
        <CardTitle className="text-xs text-white/60 lowercase">
          Saldo disponível
        </CardTitle>
        <p className="text-2xl font-bold">
          {formatCurrency(Number(user.balance))}
        </p>
      </CardHeader>
      <CardFooter className="flex flex-col gap-1.5 pb-5">
        <CardDescription className="ml-5 text-xs text-white/60">
          {user.banks.length}{" "}
          {user.banks.length === 1 ? "conta conectada" : "contas conectadas"}
        </CardDescription>
        <BanksList banks={user.banks} />
      </CardFooter>
    </Card>
  );
};

export default Balance;
