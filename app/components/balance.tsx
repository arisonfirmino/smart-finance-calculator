import { formatCurrency } from "@/app/helpers/formatCurrency";

const Balance = ({ balance }: { balance: number }) => {
  return (
    <div className="text-center">
      <p className="text-xl font-semibold">{formatCurrency(balance)}</p>
      <p className="text-foreground/50 text-xs lowercase">Saldo disponível</p>
    </div>
  );
};

export default Balance;
