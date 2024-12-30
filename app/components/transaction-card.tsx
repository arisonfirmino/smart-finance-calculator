import { Card } from "@/app/components/ui/card";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/value";

interface TransactionCardProps {
  type: string;
  total: number;
}

const TransactionCard = ({ type, total }: TransactionCardProps) => {
  return (
    <Card className="w-full space-y-1.5 p-2.5">
      <div className="flex items-center gap-2.5">
        {type === "Income" && (
          <TrendingUpIcon size={14} className="text-green-500" />
        )}
        {type === "Expense" && (
          <TrendingDownIcon size={14} className="text-red-600" />
        )}

        <p className="text-sm uppercase">
          {type === "Income" && "Receitas"}
          {type === "Expense" && "Despesas"}
        </p>
      </div>

      <p className="font-medium">{formatCurrency(Number(total))}</p>
    </Card>
  );
};

export default TransactionCard;
