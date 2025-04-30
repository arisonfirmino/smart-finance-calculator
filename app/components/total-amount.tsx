import { MoneyReceive01Icon, MoneySend01Icon } from "hugeicons-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { User } from "@prisma/client";

interface TotalAmountProps {
  user: Pick<User, "total_income" | "total_expenses">;
}

const TotalAmount = ({ user }: TotalAmountProps) => {
  const totals = [
    { type: "income", amount: Number(user.total_income) },
    { type: "expense", amount: Number(user.total_expenses) },
  ];

  return (
    <div className="flex w-full gap-5 md:w-fit md:gap-10">
      {totals.map((total) => (
        <div
          key={total.type}
          className="border-border/30 flex w-full items-center gap-2.5 rounded-2xl border p-2.5 shadow md:rounded-none md:border-none md:p-0 md:shadow-none"
        >
          <span
            className={`flex size-10 items-center justify-center rounded-2xl ${total.type === "income" ? "bg-green-500/15 text-green-500 dark:bg-green-300/15 dark:text-green-300" : "bg-red-600/15 text-red-600 dark:bg-red-400/15 dark:text-red-400"}`}
          >
            {total.type === "income" ? (
              <MoneyReceive01Icon size={16} />
            ) : (
              <MoneySend01Icon size={16} />
            )}
          </span>
          <div>
            <p className="text-foreground/50 text-xs">
              {total.type === "income" ? "Receitas" : "Despesas"}
            </p>
            <p className="text-sm font-medium">
              {formatCurrency(total.amount)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalAmount;
