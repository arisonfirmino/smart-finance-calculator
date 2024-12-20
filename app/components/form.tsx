"use client";

import { useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import TransactionForm from "@/app/components/transaction-form";

import { createNewExpense, createNewIncome } from "@/app/actions/transaction";

import { FormProps } from "@/app/types";

const Form = ({ user }: FormProps) => {
  const [transactionType, setTransactionType] = useState("");

  return (
    <>
      <Select
        value={transactionType}
        onValueChange={(value: string) => setTransactionType(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Adicione uma nova transação" />
        </SelectTrigger>
        <SelectContent className="bg-card text-white">
          <SelectItem value="income">Receita</SelectItem>
          <SelectItem value="expense">Despesa</SelectItem>
        </SelectContent>
      </Select>

      {transactionType && (
        <TransactionForm
          userId={user.id}
          setTransactionType={() => setTransactionType("")}
          handleSubmitForm={
            transactionType === "income" ? createNewIncome : createNewExpense
          }
        />
      )}
    </>
  );
};

export default Form;
