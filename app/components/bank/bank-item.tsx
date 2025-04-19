import { Badge } from "@/app/components/ui/badge";
import BankBadge from "@/app/components/bank/bank-badge";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Bank } from "@prisma/client";

interface BankItemProps {
  bank: Bank;
}

const BankItem = ({ bank }: BankItemProps) => {
  return (
    <Badge>
      <BankBadge bank={bank} />
      <p>{formatCurrency(Number(bank.current_value))}</p>
    </Badge>
  );
};

export default BankItem;
