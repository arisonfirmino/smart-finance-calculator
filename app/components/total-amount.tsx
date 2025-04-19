import { MoneyReceive01Icon, MoneySend01Icon } from "hugeicons-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { User } from "@prisma/client";

interface TotalAmountProps {
  user: Pick<User, "total_incomes" | "total_expenses">;
}

const TotalAmount = ({ user }: TotalAmountProps) => {
  const totals = [
    { type: "income", amount: Number(user.total_incomes) },
    { type: "expense", amount: Number(user.total_expenses) },
  ];

  return (
    <div className="flex gap-5 p-5">
      {totals.map((total) => (
        <div
          key={total.type}
          className="border-border/30 flex w-full items-center gap-2.5 rounded-2xl border p-2.5"
        >
          <span
            className={`flex size-10 items-center justify-center rounded-2xl ${total.type === "income" ? "bg-green-500/30 text-green-500" : "bg-red-600/30 text-red-600"}`}
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
