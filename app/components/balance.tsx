"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/app/components/ui/avatar";

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
      <CardHeader>
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

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setShowTotalBalance(!showTotalBalance)}>
                {showTotalBalance ? (
                  <EyeIcon size={16} />
                ) : (
                  <EyeOffIcon size={16} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{showTotalBalance ? "Esconder saldo" : "Mostrar saldo"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <CardContent>
        <p className="text-xs font-medium uppercase">Saldo total</p>
        <h3 className="text-xl font-bold">
          {showTotalBalance
            ? `${formatCurrency(Number(user.balance))}`
            : "******"}
        </h3>
      </CardContent>

      <CardFooter className="justify-end">
        <p className="text-end text-xs text-gray-400">
          atualizado em {formatDateForBalance(user.update_at)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default Balance;
