"use client";

import { useState } from "react";

import ActionButtonMobile from "@/app/(home)/components/mobile/action-button-mobile";

import { Prisma } from "@prisma/client";

interface ButtonsPanelMobileProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
    };
  }>;
}

const ButtonsPanelMobile = ({ user }: ButtonsPanelMobileProps) => {
  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [openBank, setOpenBank] = useState(false);

  return (
    <div className="flex flex-col gap-5 pl-5 md:hidden md:pl-0">
      <ActionButtonMobile
        user={user}
        type="income"
        disabled={user.banks.length === 0}
        open={openIncome}
        setOpen={setOpenIncome}
      />

      <ActionButtonMobile
        user={user}
        type="expense"
        disabled={user.banks.length === 0}
        open={openExpense}
        setOpen={setOpenExpense}
      />

      <ActionButtonMobile
        user={user}
        type="bank"
        open={openBank}
        setOpen={setOpenBank}
      />
    </div>
  );
};

export default ButtonsPanelMobile;
