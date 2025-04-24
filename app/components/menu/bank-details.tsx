import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import BankBadge from "@/app/components/bank/bank-badge";
import DeleteBank from "@/app/components/menu/delete-bank";
import BalanceInfo from "@/app/components/menu/balance-info";

import { Bank } from "@prisma/client";

interface BankDetailsProps {
  bank: Bank;
}

const BankDetails = ({ bank }: BankDetailsProps) => {
  return (
    <Card className="border-border/30 border-b pb-2.5">
      <CardHeader className="flex items-center justify-between">
        <BankBadge bank={bank} size="size-3" showName={true} />
        <DeleteBank bankId={bank.id} />
      </CardHeader>

      <CardContent className="space-y-1 pt-2.5">
        <BalanceInfo
          label="Saldo inicial"
          date={bank.created_at}
          value={Number(bank.initial_value)}
        />

        <BalanceInfo
          label="Saldo disponível"
          date={new Date()}
          value={Number(bank.current_value)}
        />
      </CardContent>
    </Card>
  );
};

export default BankDetails;
