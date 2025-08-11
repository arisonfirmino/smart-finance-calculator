import { cn } from "@/app/lib/utils";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import BankIcon from "@/app/components/bank-icon";
import DeleteTransaction from "@/app/components/delete-transaction";

import { CircleArrowDownIcon, CircleArrowUpIcon, DotIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";
import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Transaction } from "@/app/types";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between [&_svg:not([class*='size-'])]:size-4">
        <div
          className={cn(
            "flex items-center gap-1.5",
            transaction.type === "income"
              ? "[&_svg]:text-income"
              : "[&_svg]:text-expense",
          )}
        >
          {transaction.type === "income" ? (
            <CircleArrowDownIcon />
          ) : (
            <CircleArrowUpIcon />
          )}
          <CardTitle>{transaction.title}</CardTitle>
        </div>

        <span className="text-foreground/50 text-xs uppercase">
          {formatDate(transaction.date)}
        </span>
      </CardHeader>

      <CardFooter className="mt-1 flex-row items-center justify-between">
        <div className="flex items-center gap-0.5">
          <p className="text-foreground/80 text-sm">
            {transaction.type === "expense" && "-"}{" "}
            {formatCurrency(Number(transaction.amount))}
          </p>

          <DotIcon size={16} className="text-foreground/50" />

          <div className="text-foreground/80 flex items-center gap-1.5 text-xs">
            <BankIcon bank={transaction.bank} size="size-3" />
            <span>{transaction.bank.name}</span>
          </div>
        </div>

        <DeleteTransaction transaction={transaction} />
      </CardFooter>
    </Card>
  );
};

export default TransactionItem;
