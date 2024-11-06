"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Balance = () => {
  const [showTotalBalance, setShowTotalBalance] = useState(true);

  return (
    <Card className="relative space-y-5 p-5">
      <Avatar>
        <AvatarImage src="/SFC logo.png" />
      </Avatar>

      <Button
        size="icon"
        onClick={() => setShowTotalBalance(!showTotalBalance)}
        className="absolute -top-2 right-2.5"
      >
        {showTotalBalance ? <EyeIcon /> : <EyeOffIcon />}
      </Button>

      <div>
        <h3 className="text-xs font-medium uppercase">Saldo total</h3>
        <h2 className="text-xl font-bold">
          {showTotalBalance ? "R$ 0,00" : "******"}
        </h2>
      </div>

      <p className="text-end text-xs text-gray-400">atualizado em 06 de nov</p>
    </Card>
  );
};

export default Balance;
