import { Card } from "@/app/components/ui/card";

import { TrendingDownIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/value";

import { TotalExpensesProps } from "@/app/types";

const TotalExpenses = ({ user }: TotalExpensesProps) => {
  return (
    <Card className="w-full space-y-1.5 p-2.5">
      <div className="flex items-center gap-2.5">
        <TrendingDownIcon size={14} className="text-red-600" />
        <h3 className="text-sm uppercase">Despesas</h3>
      </div>
      <h2 className="font-medium">
        {formatCurrency(Number(user.total_expenses))}
      </h2>
    </Card>
  );
};

export default TotalExpenses;
