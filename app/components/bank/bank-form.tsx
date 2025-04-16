"use client";

import { useState } from "react";

import banks from "@/banks.json";

import BankPicker from "@/app/components/bank/bank-picker";
import CurrencyInput from "@/app/components/currency-input";
import SubmitButton from "@/app/components/submit-button";

const BankForm = () => {
  const [amount, setAmount] = useState<number>(0);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);

    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  return (
    <form className="flex flex-col gap-5 px-5">
      <BankPicker banks={banks} />

      <CurrencyInput value={amount} onChange={onChange} />

      <SubmitButton isLoading={false} />
    </form>
  );
};

export default BankForm;
