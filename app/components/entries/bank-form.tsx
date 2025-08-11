"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import BankPicker from "@/app/components/entries/bank-picker";
import CurrencyInput from "@/app/components/entries/currency-input";
import { Button } from "@/app/components/ui/button";

import banks from "@/banks.json";

import { createBank } from "@/app/actions/bank/create";

interface BankFormProps {
  setOpen: (value: boolean) => void;
}

const BankForm = ({ setOpen }: BankFormProps) => {
  const [bank, setBank] = useState<{ name: string; icon: string } | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) setAmount(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) return;

    setIsLoading(true);

    if (!bank) {
      setError("Selecione um banco para continuar");
      setIsLoading(false);
      return;
    }

    const result = await createBank({
      userEmail: session.user.email,
      name: bank.name,
      icon: bank.icon,
      starting_balance: amount ? amount : undefined,
    });

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setError(null);
    setBank(null);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 p-5">
      <BankPicker banks={banks} setBank={setBank} />
      <CurrencyInput value={amount} onChange={onChange} />

      {error && <p className="text-destructive text-xs">{error}</p>}

      <Button type="submit" disabled={isLoading} className="w-full">
        Adicionar
      </Button>

      <Button
        type="button"
        onClick={() => setOpen(false)}
        variant="outline"
        className="w-full"
      >
        Cancelar
      </Button>
    </form>
  );
};

export default BankForm;
