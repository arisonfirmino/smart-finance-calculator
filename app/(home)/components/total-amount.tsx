"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet";
import TransactionsList from "@/app/(home)/components/history/transactions-list";

import {
  TrendingUpIcon,
  TrendingDownIcon,
  ChevronRightIcon,
} from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Prisma } from "@prisma/client";

interface TotalAmountProps {
  type: "income" | "expense";
  total: number;
  transactions: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>[];
}

const TotalAmount = ({ type, total, transactions }: TotalAmountProps) => {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <Sheet>
      <SheetTrigger
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "flex-1 justify-between border-none",
        )}
      >
        {showLabel ? (
          <>
            {type === "income" ? "Receitas" : "Despesas"}
            <ChevronRightIcon size={16} />
          </>
        ) : (
          <>
            {type === "income" ? (
              <TrendingUpIcon size={16} className="text-green-500" />
            ) : (
              <TrendingDownIcon size={16} className="text-red-600" />
            )}
            {formatCurrency(total)}
          </>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Detalhes das {type === "income" ? "Receitas" : "Despesas"}
          </SheetTitle>
          <SheetDescription>
            Veja mais informações sobre suas{" "}
            {type === "income" ? "receitas acumuladas" : "despesas totais"}.
          </SheetDescription>
        </SheetHeader>

        {transactions.length > 0 ? (
          <TransactionsList transactions={transactions} />
        ) : (
          <p className="text-muted-foreground text-center text-sm">
            Nenhuma {type === "income" ? "receita" : "despesa"} registrada.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TotalAmount;
