"use client";

import { useState } from "react";
import TransactionHistory from "@/components/transaction-history";
import { TransactionViewerProps } from "@/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const TransactionViewer = ({
  userId,
  transactions,
}: TransactionViewerProps) => {
  const [filter, setFilter] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return filter === "incomes"
      ? transaction.type === "income"
      : transaction.type === "expense";
  });

  return (
    <>
      <Select defaultValue="all" onValueChange={setFilter}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card text-white">
          <SelectItem value="all">Histórico de transações</SelectItem>
          <SelectItem value="incomes">Histórico de receitas</SelectItem>
          <SelectItem value="expenses">Histórico de despesas</SelectItem>
        </SelectContent>
      </Select>

      <TransactionHistory userId={userId} transactions={filteredTransactions} />
    </>
  );
};

export default TransactionViewer;
