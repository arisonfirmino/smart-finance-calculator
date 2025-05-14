"use client";

import { useState } from "react";

import Search from "@/app/components/search";
import FinancialChartDrawerMobile from "@/app/(home)/components/mobile/financial-chart-drawer-mobile";
import TransactionsList from "@/app/components/transaction/transactions-list";

import { Prisma } from "@prisma/client";

interface TransactionsSectionProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: true;
      transactions: {
        include: {
          bank: true;
        };
      };
    };
  }>;
  hasTransactions: boolean;
}

const TransactionsSection = ({
  user,
  hasTransactions,
}: TransactionsSectionProps) => {
  const [search, setSearch] = useState("");

  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredTransactions = user.transactions.filter((transaction) =>
    normalize(transaction.title).includes(normalize(search)),
  );

  const hasBanks = user.banks.length > 0;

  const noTransactionMessage = hasBanks
    ? "Controle suas finanças com facilidade."
    : "Você ainda não cadastrou um banco.";

  const noTransactionSubMessage = hasBanks
    ? "Adicione uma nova receita ou despesa e acompanhe de perto o seu saldo."
    : "Para começar a registrar suas transações e controlar suas finanças, cadastre um banco agora mesmo.";

  return (
    <>
      <div className="flex gap-5">
        <Search onChange={setSearch} />
        {hasTransactions && <FinancialChartDrawerMobile user={user} />}
      </div>

      {hasTransactions ? (
        <TransactionsList transactions={filteredTransactions} />
      ) : (
        <p className="text-foreground/50 px-5 text-center text-sm md:px-0 md:text-start">
          {noTransactionMessage}
          <br />
          <span className="text-xs">{noTransactionSubMessage}</span>
        </p>
      )}
    </>
  );
};

export default TransactionsSection;
