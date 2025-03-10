"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getUser } from "@/app/helpers/getUser";

import { UseFormRegisterReturn } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import BankBadge from "@/app/components/bank-badge";

import { Bank } from "@prisma/client";

interface BankPickerProps {
  register: UseFormRegisterReturn;
  onChange: (value: string) => void;
}

const BankPicker = ({ register, onChange }: BankPickerProps) => {
  const [banks, setBanks] = useState<Bank[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const getUserBanks = async () => {
      if (!session) return;

      const user = await getUser({ id: session.user.id });

      if (!user) return null;

      setBanks(user.banks);
    };

    getUserBanks();
  }, [session]);

  return (
    <Select {...register} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o banco" />
      </SelectTrigger>
      <SelectContent>
        {banks.map((bank) => (
          <SelectItem key={bank.id} value={bank.id}>
            <BankBadge icon={bank.icon} name={bank.name} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BankPicker;
