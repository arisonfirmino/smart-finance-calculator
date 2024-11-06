import { Card } from "@/components/ui/card";
import { TrendingUpIcon } from "lucide-react";
import DeleteTransaction from "@/components/delete-transaction";

const Transaction = () => {
  return (
    <Card className="relative flex items-end justify-between p-2.5 duration-500 hover:scale-[1.02]">
      <div>
        <div className="flex items-center gap-2.5">
          <TrendingUpIcon size={14} className="text-green-500" />
          <h4 className="text-sm capitalize">salário</h4>
        </div>
        <h2 className="font-medium">R$ 0,00</h2>
      </div>

      <DeleteTransaction />

      <small className="text-gray-400">06/11/2024</small>
    </Card>
  );
};

export default Transaction;
