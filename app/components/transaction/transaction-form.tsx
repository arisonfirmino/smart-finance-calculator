"use client";

import { useState } from "react";

import DatePicker from "@/app/components/transaction/date-picker";
import BankPicker from "@/app/components/bank/bank-picker";
import { Input } from "@/app/components/ui/input";
import CurrencyInput from "@/app/components/currency-input";
import TypePicker from "@/app/components/transaction/type-picker";
import SubmitButton from "@/app/components/submit-button";

const TransactionForm = ({ banks }: { banks: any }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"income" | "expense">("expense");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);

    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  return (
    <form className="flex flex-col gap-5 px-5">
      <DatePicker date={date} setDate={setDate} />

      <BankPicker banks={banks} />

      <Input placeholder="Título" />

      <CurrencyInput value={amount} onChange={onChange} />

      <TypePicker type={type} setType={setType} />

      <SubmitButton isLoading={false} />
    </form>
  );
};

export default TransactionForm;
