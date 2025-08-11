"use client";

import { useState } from "react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";
import TransactionForm from "@/app/components/entries/transaction-form";

import { CircleArrowDownIcon, CircleArrowUpIcon } from "lucide-react";

import { User } from "@/app/types";

interface NewTransactionProps {
  type: string;
  user: User;
}

const NewTransaction = ({ type, user }: NewTransactionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger disabled={user.banks.length === 0}>
        <div
          className={`bg-background flex size-10 items-center justify-center rounded-2xl border shadow-xs ${type === "income" ? "text-income" : "text-expense"}`}
        >
          {type === "income" ? (
            <CircleArrowDownIcon size={16} />
          ) : (
            <CircleArrowUpIcon size={16} />
          )}
        </div>
        <span className="text-sm font-medium md:hidden">
          {type === "income" ? "Receita" : "Despesa"}
        </span>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="w-full border-none bg-transparent p-5 shadow-none md:max-w-sm"
      >
        <div className="bg-background rounded-3xl shadow-lg">
          <SheetHeader className="p-5">
            <SheetTitle>
              Adicionar nova {type === "income" ? "receita" : "despesa"}
            </SheetTitle>
            <SheetDescription>
              Preencha as informações abaixo para registrar uma nova{" "}
              {type === "income" ? "receita" : "despesa"} à sua conta.
            </SheetDescription>
          </SheetHeader>

          <TransactionForm banks={user.banks} type={type} setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NewTransaction;
