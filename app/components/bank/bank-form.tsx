"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import banks from "@/banks.json";

import BankPicker from "@/app/components/bank/bank-picker";
import CurrencyInput from "@/app/components/currency-input";
import SubmitButton from "@/app/components/submit-button";

import { createBank } from "@/app/actions/bank/create";

import { toast } from "sonner";

interface BankFormProps {
  onSuccess: () => void;
}

const BankForm = ({ onSuccess }: BankFormProps) => {
  const [bank, setBank] = useState<any>(null);
  const [amount, setAmount] = useState<number>(0);

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) setAmount(value);
  };

  const validateForm = () => {
    if (!bank) return "Selecione um banco.";
    return "";
  };

  const resetForm = () => {
    setBank(null);
    setAmount(0);
    setError("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      toast("Usuário não autenticado.");
      return;
    }

    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setIsLoading(true);

    await toast.promise(
      createBank({
        userId: session.user.id,
        name: bank.name,
        icon: bank.icon,
        amount,
      }),
      {
        loading: "Adicionando banco...",
        success: "Banco adicionado com sucesso.",
        error: (err) => err?.error || "Erro ao adicionar banco.",
      },
    );

    onSuccess();
    resetForm();
    setIsLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 px-5">
      <BankPicker banks={banks} onSelect={setBank} />

      <CurrencyInput value={amount} onChange={onChange} />

      {error && (
        <p className="animate-fade-right animate-duration-300 text-xs text-red-600">
          {error}
        </p>
      )}

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default BankForm;
