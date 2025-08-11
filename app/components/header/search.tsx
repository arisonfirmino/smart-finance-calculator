"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import TransactionItem from "@/app/components/transaction-item";

import { SearchIcon } from "lucide-react";

import { sortTransactions } from "@/app/helpers/sortTransactions";

import { User } from "@/app/types";

const Search = ({ user }: { user: User }) => {
  const [search, setSearch] = useState("");

  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredTransactions = user.transactions.filter((transaction) =>
    normalize(transaction.title).includes(normalize(search)),
  );

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "hover:bg-primary/5 active:bg-primary/5 xl:text-foreground/50 xl:hover:text-foreground/100 xl:hover:border-primary absolute top-1/2 right-[70px] flex h-10 w-full max-w-10 -translate-y-1/2 items-center justify-center gap-2 rounded-2xl bg-transparent duration-200 xl:fixed xl:top-5 xl:right-5 xl:max-w-60 xl:-translate-y-0 xl:justify-start xl:border xl:px-3 xl:hover:bg-transparent xl:active:bg-transparent",
        )}
      >
        <SearchIcon size={16} />
        <span className="hidden text-sm xl:flex">Pesquisar</span>
      </DialogTrigger>

      <DialogContent
        className={cn("top-0 -translate-y-0 gap-2.5 bg-transparent md:top-5")}
      >
        <DialogHeader className="bg-background rounded-2xl">
          <form className="flex items-center px-3">
            <SearchIcon size={16} />
            <Input
              placeholder="Digite para buscar transações..."
              onChange={(e) => setSearch(e.target.value)}
              className="border-none"
            />
          </form>
        </DialogHeader>

        <DialogTitle className="text-primary-foreground text-xs font-normal">
          {!search && "Digite para iniciar a busca"}
          {search &&
            filteredTransactions.length === 0 &&
            "Nenhum resultado encontrado"}
          {search &&
            filteredTransactions.length > 0 &&
            `${filteredTransactions.length} ${filteredTransactions.length === 1 ? "resultado encontrado" : "resultados econtrados"}`}
        </DialogTitle>

        {search && (
          <ul className="space-y-5">
            {sortTransactions(filteredTransactions).map((transaction) => (
              <li
                key={transaction.id}
                className="bg-background rounded-lg p-2.5"
              >
                <TransactionItem transaction={transaction} />
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Search;
