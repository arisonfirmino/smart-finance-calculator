"use client";

import { useState } from "react";

import ActionButtonDesktop from "@/app/(home)/components/desktop/action-button-desktop";

import { Prisma } from "@prisma/client";

interface ButtonsPanelDesktopProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const ButtonsPanelDesktop = ({ user }: ButtonsPanelDesktopProps) => {
  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [openBank, setOpenBank] = useState(false);

  return (
    <div className="hidden gap-5 md:flex">
      <ActionButtonDesktop
        user={user}
        type="income"
        disabled={user.banks.length === 0}
        open={openIncome}
        setOpen={setOpenIncome}
      />

      <ActionButtonDesktop
        user={user}
        type="expense"
        disabled={user.banks.length === 0}
        open={openExpense}
        setOpen={setOpenExpense}
      />

      <ActionButtonDesktop
        user={user}
        type="bank"
        open={openBank}
        setOpen={setOpenBank}
      />
    </div>
  );
};

export default ButtonsPanelDesktop;
