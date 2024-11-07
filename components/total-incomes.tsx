import { formatCurrency } from "@/app/helpers/value";
import { Card } from "@/components/ui/card";
import { TotalIncomesProps } from "@/types";
import { TrendingUpIcon } from "lucide-react";

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
