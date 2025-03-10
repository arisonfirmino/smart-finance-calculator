import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import Search from "@/app/(home)/components/history/search";
import TransactionsList from "@/app/(home)/components/history/transactions-list";

import { ArrowDownUpIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface TransactionHistoryProps {
  transactions: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <Card className="h-fit w-full rounded-lg md:max-w-1/2">
      <CardHeader>
        <CardTitle>Histórico</CardTitle>
        <ArrowDownUpIcon size={16} />
      </CardHeader>

      <CardContent className="space-y-2 p-2">
        <Search />
        {transactions.length > 0 ? (
          <TransactionsList transactions={transactions} />
        ) : (
          <p className="text-muted-foreground text-center text-sm">
            Você ainda não adicionou nenhuma transação.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
