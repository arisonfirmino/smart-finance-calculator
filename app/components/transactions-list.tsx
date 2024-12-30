"use client";

import { useState } from "react";

import Search from "@/app/components/search";
import DeleteAllTransactionsButton from "@/app/components/delete-all-transactions-button";
import FilterButton from "@/app/components/filter-button";
import TransactionItem from "@/app/components/transaction-item";

import { Expense, Income } from "@prisma/client";

interface TransactionsListProps {
  userId: string;
  transactions: Income[] | Expense[];
}

const TransactionsList = ({ userId, transactions }: TransactionsListProps) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;

    return filter === "incomes"
      ? transaction.type === "income"
      : transaction.type === "expense";
  });

  const filteredBySearch = filteredTransactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="h-full w-full space-y-5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="px-5 pt-14 md:p-0 xl:px-5 xl:pt-5">
        <Search search={search} onSearch={setSearch} />
      </div>

      <div className="flex items-center justify-between px-5 md:p-0 xl:px-5">
        <p className="font-medium uppercase">Transações</p>

        <div className="flex items-center gap-2.5">
          {transactions.length > 0 && <DeleteAllTransactionsButton />}
          <FilterButton setFilter={setFilter} />
        </div>
      </div>

      <ul className="space-y-5 px-5 pb-5 md:p-0 xl:px-5 xl:pb-5">
        {filteredBySearch.map((transaction) => (
          <li key={transaction.id}>
            <TransactionItem
              userId={userId}
              transaction={JSON.parse(JSON.stringify(transaction))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
