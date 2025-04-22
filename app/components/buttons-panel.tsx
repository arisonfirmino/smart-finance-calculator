"use client";

import { useState } from "react";

import ActionButton from "@/app/components/action-button";
import NewBank from "@/app/components/bank/new-bank";
import NewTransaction from "@/app/components/transaction/new-transaction";

import { Prisma } from "@prisma/client";

interface ButtonsPanelProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const ButtonsPanel = ({ user }: ButtonsPanelProps) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"income" | "expense" | null>(null);

  const openDrawer = (type: "income" | "expense") => {
    setType(type);
    setOpen(true);
  };

  return (
    <div className="flex w-fit flex-col items-center gap-5 px-5">
      <ActionButton
        disabled={user.banks.length === 0}
        type="income"
        onClick={() => openDrawer("income")}
      />

      <ActionButton
        disabled={user.banks.length === 0}
        type="expense"
        onClick={() => openDrawer("expense")}
      />

      {type && (
        <NewTransaction user={user} type={type} open={open} setOpen={setOpen} />
      )}

      <NewBank />
    </div>
  );
};

export default ButtonsPanel;
