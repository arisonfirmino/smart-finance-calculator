import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/components/ui/card";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

import { Prisma } from "@prisma/client";
import { formatCurrency } from "@/app/helpers/formatCurrency";

interface TransactionItemProps {
  transaction: Prisma.TransactionGetPayload<{
    include: {
      bank: true;
    };
  }>;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <Card className="border-border/10 flex-row items-center gap-2.5 border-b p-5">
      <span
        className={`flex size-9 items-center justify-center rounded-full ${transaction.type === "income" ? "bg-green-500/15 text-green-500" : "bg-red-600/15 text-red-600"}`}
      >
        {transaction.type === "income" ? (
          <ArrowUpIcon size={16} />
        ) : (
          <ArrowDownIcon size={16} />
        )}
      </span>
      <CardContent className="capitalize">
        <CardTitle>{transaction.title}</CardTitle>
        <CardDescription>
          {formatCurrency(Number(transaction.amount))}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default TransactionItem;
