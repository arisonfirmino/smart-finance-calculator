import { Card, CardFooter, CardHeader } from "@/app/components/ui/card";
import DeleteTransaction from "@/app/components/delete-transaction";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/value";
import { formatDateLong } from "@/app/helpers/formatDate";

import { TransactionProps } from "@/app/types";

const TransactionItem = ({ userId, transaction }: TransactionProps) => {
  return (
    <Card className="space-y-0.5">
      <CardHeader>
        <div className="flex items-center gap-2">
          {transaction.type === "income" ? (
            <TrendingUpIcon size={14} className="text-green-500" />
          ) : (
            <TrendingDownIcon size={14} className="text-red-600" />
          )}
          <p className="text-sm capitalize">{transaction.title}</p>
        </div>

        <DeleteTransaction userId={userId} transaction={transaction} />
      </CardHeader>

      <CardFooter>
        <p className="font-medium">
          {formatCurrency(Number(transaction.value))}
        </p>

        <p className="text-xs">{formatDateLong(transaction.date)}</p>
      </CardFooter>
    </Card>
  );
};

export default TransactionItem;
