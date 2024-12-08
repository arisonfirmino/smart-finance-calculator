import { Card } from "@/app/components/ui/card";
import DeleteTransaction from "@/app/components/delete-transaction";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/value";
import { formatDateLong } from "@/app/helpers/formatDate";

import { TransactionProps } from "@/app/types";

const Transaction = ({ userId, transaction }: TransactionProps) => {
  return (
    <Card className="relative flex items-end justify-between p-2.5 duration-500 hover:scale-[1.02]">
      <div>
        <div className="flex items-center gap-2.5">
          {transaction.type === "income" ? (
            <TrendingUpIcon size={14} className="text-green-500" />
          ) : (
            <TrendingDownIcon size={14} className="text-red-600" />
          )}

          <h4 className="text-sm capitalize">{transaction.title}</h4>
        </div>
        <h2 className="font-medium">
          {formatCurrency(Number(transaction.value))}
        </h2>
      </div>

      <DeleteTransaction userId={userId} transaction={transaction} />

      <small className="text-gray-400">
        {formatDateLong(transaction.date)}
      </small>
    </Card>
  );
};

export default Transaction;
