"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import DatePicker from "@/app/components/transaction/date-picker";
import BankPicker from "@/app/components/bank/bank-picker";
import { Input } from "@/app/components/ui/input";
import CurrencyInput from "@/app/components/currency-input";
import SubmitButton from "@/app/components/submit-button";

import { createTransaction } from "@/app/actions/transaction/create";

import { toast } from "sonner";

interface TransactionFormProps {
  banks: any[];
  type: "income" | "expense";
  onSuccess: () => void;
}

const TransactionForm = ({ banks, type, onSuccess }: TransactionFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [bank, setBank] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) setAmount(value);
  };

  const validateForm = () => {
    if (!date) return "Selecione uma data válida.";
    if (!bank) return "Selecione um banco.";
    if (!title.trim()) return "Insira um título.";
    if (amount <= 0) return "Valor deve ser maior que zero.";
    return "";
  };

  const resetForm = () => {
    setBank(null);
    setAmount(0);
    setTitle("");
    setError("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      toast.error("Usuário não autenticado.");
      return;
    }

    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setIsLoading(true);

    const result = await createTransaction({
      userId: session.user.id,
      bankId: bank.id,
      title,
      type,
      amount,
      date,
    });

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    onSuccess();
    resetForm();
    setIsLoading(false);
    toast(
      `${type === "income" ? "Receita" : "Despesa"} adicionada com sucesso.`,
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 px-5">
      <DatePicker date={date} setDate={setDate} />

      <BankPicker banks={banks} onSelect={setBank} />

      <div className="flex flex-col gap-5">
        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <CurrencyInput value={amount} onChange={onChange} />
      </div>

      {error && (
        <p className="animate-fade-right animate-duration-300 text-xs text-red-600">
          {error}
        </p>
      )}

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default TransactionForm;
