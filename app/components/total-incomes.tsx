import { Card } from "@/app/components/ui/card";

import { TrendingUpIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/value";

import { TotalIncomesProps } from "@/app/types";

const TotalIncomes = ({ user }: TotalIncomesProps) => {
  return (
    <Card className="w-full space-y-1.5 p-2.5">
      <div className="flex items-center gap-2.5">
        <TrendingUpIcon size={14} className="text-green-500" />
        <h3 className="text-sm uppercase">Receitas</h3>
      </div>
      <h2 className="font-medium">
        {formatCurrency(Number(user.total_incomes))}
      </h2>
    </Card>
  );
};

export default TotalIncomes;
