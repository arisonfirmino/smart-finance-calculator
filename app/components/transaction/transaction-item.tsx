import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/app/components/ui/card";
import BankBadge from "@/app/components/bank/bank-badge";
import DeleteTransaction from "@/app/components/transaction/delete-transaction";

import { ArrowDown02Icon, ArrowUp02Icon } from "hugeicons-react";
import { DotIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Prisma } from "@prisma/client";

interface TransactionItemProps {
  transaction: Prisma.TransactionGetPayload<{
    include: {
      bank: true;
    };
  }>;
  isLast: boolean;
}

const TransactionItem = ({ transaction, isLast }: TransactionItemProps) => {
  return (
    <Card
      className={`border-border/5 relative flex-row items-center gap-2.5 p-5 ${isLast ? "" : "border-b"}`}
    >
      <span
        className={`flex size-9 items-center justify-center rounded-2xl ${transaction.type === "income" ? "bg-green-500/15 text-green-500" : "bg-red-600/15 text-red-600"}`}
      >
        {transaction.type === "income" ? (
          <ArrowUp02Icon size={16} />
        ) : (
          <ArrowDown02Icon size={16} />
        )}
      </span>
      <CardContent className="capitalize">
        <CardTitle className="text-foreground/50 text-xs">
          {transaction.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm font-medium">
          {formatCurrency(Number(transaction.amount))}
          <DotIcon size={16} className="text-foreground/50" />
          <BankBadge bank={transaction.bank} showName={true} size="size-3" />
        </CardDescription>
      </CardContent>

      <DeleteTransaction transaction={transaction} />
    </Card>
  );
};

export default TransactionItem;
