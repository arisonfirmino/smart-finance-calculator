"use client";

import { useState } from "react";

import { Card } from "@/app/components/ui/card";
import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";

import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";

import { getGreeting } from "@/app/helpers/greeting";
import { formatCurrency } from "@/app/helpers/value";
import { formatDateForBalance } from "@/app/helpers/formatDate";

import { BalanceProps } from "@/app/types";

const Balance = ({ user }: BalanceProps) => {
  const [showTotalBalance, setShowTotalBalance] = useState(true);

  const greeting = getGreeting();

  return (
    <Card className="relative space-y-5 p-5">
      <div className="flex items-center gap-2.5">
        <Avatar>
          {user.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <LoaderIcon className="animate-spin" />
          )}
        </Avatar>
        <div>
          <p className="text-sm text-gray-400">{greeting},</p>
          <h2 className="font-medium">{user.name}</h2>
        </div>
      </div>

      <Button
        size="icon"
        onClick={() => setShowTotalBalance(!showTotalBalance)}
        className="absolute -top-2 right-2.5"
      >
        {showTotalBalance ? <EyeIcon /> : <EyeOffIcon />}
      </Button>

      <div>
        <h4 className="text-xs font-medium uppercase">Saldo total</h4>
        <h3 className="text-xl font-bold">
          {showTotalBalance
            ? `${formatCurrency(Number(user.balance))}`
            : "******"}
        </h3>
      </div>

      <p className="text-end text-xs text-gray-400">
        atualizado em {formatDateForBalance(user.update_at)}
      </p>
    </Card>
  );
};

export default Balance;
