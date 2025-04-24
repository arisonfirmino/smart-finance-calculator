import { formatDate } from "@/app/helpers/formatDate";
import { formatCurrency } from "@/app/helpers/formatCurrency";

interface BalanceInfoProps {
  label: string;
  date: Date;
  value: number;
}

const BalanceInfo = ({ label, date, value }: BalanceInfoProps) => {
  return (
    <div>
      <p className="text-xs font-medium uppercase">{formatDate(date)}</p>
      <p className="text-foreground/50 text-xs">
        <span className="lowercase">{label}</span>: {formatCurrency(value)}
      </p>
    </div>
  );
};

export default BalanceInfo;
