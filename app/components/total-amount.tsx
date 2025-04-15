import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

interface TotalAmountProps {
  type: "income" | "expense";
  total: number;
}

const TotalAmount = ({ type, total }: TotalAmountProps) => {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-2 px-4 py-2">
      {type === "income" ? (
        <TrendingUpIcon size={16} className="text-green-500" />
      ) : (
        <TrendingDownIcon size={16} className="text-red-600" />
      )}

      <p className="text-sm font-medium">{formatCurrency(total)}</p>
    </div>
  );
};

export default TotalAmount;
