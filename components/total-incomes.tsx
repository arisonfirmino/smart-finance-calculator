import { Card } from "@/components/ui/card";
import { TrendingUpIcon } from "lucide-react";

const TotalIncomes = () => {
  return (
    <Card className="w-full space-y-1.5 p-2.5">
      <div className="flex items-center gap-2.5">
        <TrendingUpIcon size={14} className="text-green-500" />
        <h3 className="text-sm uppercase">Receitas</h3>
      </div>
      <h2 className="font-medium">R$ 0,00</h2>
    </Card>
  );
};

export default TotalIncomes;
