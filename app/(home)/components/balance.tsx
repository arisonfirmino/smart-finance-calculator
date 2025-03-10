"use client";

import { useState } from "react";

import { Badge } from "@/app/components/ui/badge";
import BankBadge from "@/app/components/bank-badge";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Prisma } from "@prisma/client";

interface BalanceProps {
  user: Prisma.UserGetPayload<{
    include: { banks: true };
  }>;
}

const Balance = ({ user }: BalanceProps) => {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <div className="space-y-1">
      <div className="relative">
        <p className="text-muted-foreground text-xs">seu saldo</p>
        <p className="text-xl font-semibold">
          {hideBalance ? "******" : formatCurrency(Number(user.balance))}
        </p>

        <button
          onClick={() => setHideBalance(!hideBalance)}
          className="absolute top-0 right-0 cursor-pointer"
        >
          {hideBalance ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </button>
      </div>

      {user.banks.length > 0 && (
        <ul className="flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {user.banks.map((bank) => (
            <li key={bank.icon}>
              <Badge variant="outline">
                <BankBadge icon={bank.icon} />
                {hideBalance
                  ? "******"
                  : formatCurrency(Number(bank.current_balance))}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Balance;
