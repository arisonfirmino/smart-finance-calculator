import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

interface TotalAmountProps {
  type: "income" | "expense";
}

const TotalAmount = ({ type }: TotalAmountProps) => {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-2 px-4 py-2">
      {type === "income" ? (
        <TrendingUpIcon size={16} className="text-green-500" />
      ) : (
        <TrendingDownIcon size={16} className="text-red-600" />
      )}

      <p className="text-sm font-medium">R$ 2.500,00</p>
    </div>
  );
};

export default TotalAmount;
