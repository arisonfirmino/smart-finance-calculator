"use client";

import { useState } from "react";

import { Badge } from "@/app/components/ui/badge";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";
import BankItem from "@/app/components/bank-item";

const Balance = () => {
  const [hideBalance, setHideBalance] = useState(false);

  const banks = [
    {
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/80/93/85/80938541-37ff-65eb-351f-1e6973588309/AppIcon-0-0-1x_U007emarketing-0-9-0-0-85-220.png/434x0w.webp",
      value: 500,
    },
    {
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/cc/07/70/cc07706c-ff82-af3e-4186-421737752377/Varejo-AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/434x0w.webp",
      value: 500,
    },
    {
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e1/69/5c/e1695c18-6e0b-3259-9b3f-4d21f71fcc13/AppIcon-1x_U007ephone-0-10-0-sRGB-85-220-0.png/434x0w.webp",
      value: 500,
    },
  ];

  return (
    <div className="space-y-1">
      <div className="relative">
        <p className="text-muted-foreground text-xs">seu saldo</p>
        <p className="text-xl font-semibold">
          {hideBalance ? "******" : formatCurrency(500)}
        </p>

        <button
          onClick={() => setHideBalance(!hideBalance)}
          className="absolute top-0 right-0 cursor-pointer"
        >
          {hideBalance ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </button>
      </div>

      <ul className="flex gap-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {banks.map((bank) => (
          <li key={bank.icon}>
            <Badge variant="outline">
              <BankItem icon={bank.icon} />
              {hideBalance ? "******" : formatCurrency(bank.value)}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Balance;
