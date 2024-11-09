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
import {
  ArrowUpDownIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";

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
      <div className="flex items-center justify-between">
        <h3 className="font-medium uppercase">Histórico de transações</h3>
        <Select defaultValue="all" onValueChange={setFilter}>
          <SelectTrigger showIcon={false} className="w-fit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card text-white">
            <SelectItem value="all" showCheckIcon={false}>
              <ArrowUpDownIcon size={16} />
            </SelectItem>
            <SelectItem value="incomes" showCheckIcon={false}>
              <TrendingUpIcon size={16} className="text-green-500" />
            </SelectItem>
            <SelectItem value="expenses" showCheckIcon={false}>
              <TrendingDownIcon size={16} className="text-red-600" />
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <TransactionHistory userId={userId} transactions={filteredTransactions} />
    </>
  );
};

export default TransactionViewer;
