import { Card } from "@/components/ui/card";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import DeleteTransaction from "@/components/delete-transaction";
import { TransactionProps } from "@/types";
import { formatCurrency } from "@/app/helpers/value";
import { formatDateLong } from "@/app/helpers/formatDate";

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
