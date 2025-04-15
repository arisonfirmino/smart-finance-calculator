"use client";

import { useState } from "react";

import DatePicker from "@/app/components/transaction/date-picker";
import BankPicker from "@/app/components/bank/bank-picker";
import { Input } from "@/app/components/ui/input";
import TypePicker from "@/app/components/transaction/type-picker";
import SubmitButton from "@/app/components/submit-button";

const TransactionForm = ({ banks }: { banks: any }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<"income" | "expense">("expense");

  return (
    <form className="flex flex-col gap-5 px-5">
      <DatePicker date={date} setDate={setDate} />

      <BankPicker banks={banks} />

      <Input placeholder="Título" />

      <Input placeholder="R$ 0,00" />

      <TypePicker type={type} setType={setType} />

      <SubmitButton isLoading={false} />
    </form>
  );
};

export default TransactionForm;
