"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import banks from "@/banks.json";

import BankPicker from "@/app/components/bank/bank-picker";
import CurrencyInput from "@/app/components/currency-input";
import SubmitButton from "@/app/components/submit-button";

import { addBank } from "@/app/actions/bank";

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

    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) return;

    if (!bank) {
      setError("Por favor, selecione um banco.");
      return;
    }

    setIsLoading(true);

    const response = await addBank({
      userId: session.user.id,
      name: bank.name,
      icon: bank.icon,
      initial_value: amount ? amount : undefined,
    });

    if (response?.error) {
      setError(response.error);
      setIsLoading(false);
      return;
    }

    setBank(null);
    setAmount(0);
    setError("");
    setIsLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 px-5">
      <BankPicker banks={banks} onSelect={setBank} />

      <CurrencyInput value={amount} onChange={onChange} />

      {error && (
        <small className="animate-fade-right animate-duration-300 text-xs text-red-600">
          {error}
        </small>
      )}

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default BankForm;
