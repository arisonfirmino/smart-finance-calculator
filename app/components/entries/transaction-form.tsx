"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import DatePicker from "@/app/components/entries/date-picker";
import { Input } from "@/app/components/ui/input";
import CurrencyInput from "@/app/components/entries/currency-input";
import BankPicker from "@/app/components/entries/bank-picker";
import { Button } from "@/app/components/ui/button";

import { createTransaction } from "@/app/actions/transaction/create";

import { Bank } from "@/app/types";

interface TransactionFormProps {
  banks: Bank[];
  type: string;
  setOpen: (value: boolean) => void;
}

const TransactionForm = ({ banks, type, setOpen }: TransactionFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [bank, setBank] = useState<Bank | null>(null);
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

    if (!type) {
      setError("Tipo de transação não fornecido.");
      setIsLoading(false);
      return;
    }

    if (!date) {
      setError("Data da transação não fornecida.");
      setIsLoading(false);
      return;
    }

    if (!title) {
      setError("Título da transação não fornecido.");
      setIsLoading(false);
      return;
    }

    if (!amount || amount <= 0) {
      setError("O valor da transação deve ser maior que zero.");
      setIsLoading(false);
      return;
    }

    if (!bank) {
      setError("Selecione um banco.");
      setIsLoading(false);
      return;
    }

    const result = await createTransaction({
      userEmail: session.user.email,
      bankId: bank.id,
      type,
      title,
      amount,
      date,
    });

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setDate(new Date());
    setTitle("");
    setAmount(0);
    setBank(null);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5 p-5">
      <DatePicker date={date} setDate={setDate} />
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CurrencyInput value={amount} onChange={onChange} />
      <BankPicker banks={banks} setBank={setBank} />

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

export default TransactionForm;
