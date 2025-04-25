"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import DatePicker from "@/app/components/transaction/date-picker";
import BankPicker from "@/app/components/bank/bank-picker";
import { Input } from "@/app/components/ui/input";
import CurrencyInput from "@/app/components/currency-input";
import SubmitButton from "@/app/components/submit-button";

import { addTransaction } from "@/app/actions/transaction";

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

    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) return;

    if (!date) {
      setError("Por favor, selecione uma data válida.");
      return;
    }

    if (!bank) {
      setError("Por favor, selecione um banco.");
      return;
    }

    if (!title) {
      setError("Por favor, insira um título para a transação.");
      return;
    }

    if (amount <= 0) {
      setError("O valor deve ser maior que zero.");
      return;
    }

    if (!type) {
      setError("Por favor, selecione o tipo da transação.");
      return;
    }

    setIsLoading(true);

    const response = await addTransaction({
      userId: session.user.id,
      bankId: bank.id,
      title,
      type,
      amount,
      date,
    });

    if (response?.error) {
      setError(response.error);
      setIsLoading(false);
      return;
    }

    setBank(null);
    setAmount(0);
    setTitle("");
    setError("");
    setIsLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 px-5">
      <DatePicker date={date} setDate={setDate} />

      <BankPicker banks={banks} onSelect={setBank} />

      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <CurrencyInput value={amount} onChange={onChange} />
      </div>

      {error && (
        <small className="animate-fade-right animate-duration-300 text-xs text-red-600">
          {error}
        </small>
      )}

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default TransactionForm;
