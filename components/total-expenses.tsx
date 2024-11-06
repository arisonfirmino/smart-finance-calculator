import { Card } from "@/components/ui/card";
import { TrendingDownIcon } from "lucide-react";

const TotalExpenses = () => {
  return (
    <Card className="w-full space-y-1.5 p-2.5">
      <div className="flex items-center gap-2.5">
        <TrendingDownIcon size={14} className="text-red-600" />
        <h3 className="text-sm uppercase">Despesas</h3>
      </div>
      <h2 className="font-medium">R$ 0,00</h2>
    </Card>
  );
};

export default TotalExpenses;
