import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import {
  ArrowUpDownIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";

interface FilterButtonProps {
  setFilter: (value: string) => void;
}

const FilterButton = ({ setFilter }: FilterButtonProps) => {
  return (
    <Select defaultValue="all" onValueChange={setFilter}>
      <SelectTrigger showIcon={false} className="w-9 justify-center p-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" showCheckIcon={false}>
          <ArrowUpDownIcon size={16} />
        </SelectItem>
        <SelectItem value="incomes" showCheckIcon={false}>
          <TrendingUpIcon size={16} className="text-green-500" />
        </SelectItem>
        <SelectItem value="expenses" showCheckIcon={false}>
          <TrendingDownIcon size={16} className="text-red-600" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FilterButton;
