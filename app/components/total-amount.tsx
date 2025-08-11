import { CircleArrowDownIcon, CircleArrowUpIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { User } from "@/app/types";

const TotalAmount = ({
  user,
}: {
  user: Pick<User, "total_income" | "total_expenses">;
}) => {
  const totals = [
    { type: "income", amount: user.total_income },
    { type: "expense", amount: user.total_expenses },
  ];

  return (
    <div className="flex items-center gap-5 p-5 pb-0 md:gap-10 md:p-0">
      {totals.map((total) => (
        <div
          key={total.type}
          className="flex w-full items-center gap-2.5 rounded-2xl border p-2.5 md:w-fit md:rounded-none md:border-none md:p-0"
        >
          <div
            className={`flex size-10 items-center justify-center rounded-2xl ${total.type === "income" ? "bg-income/20 text-income" : "bg-expense/20 text-expense"}`}
          >
            {total.type === "income" ? (
              <CircleArrowDownIcon size={16} />
            ) : (
              <CircleArrowUpIcon size={16} />
            )}
          </div>

          <div>
            <p className="text-foreground/50 text-xs">
              {total.type === "income" ? "Receitas" : "Despesas"}
            </p>
            <p className="text-sm font-medium">
              {formatCurrency(Number(total.amount))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalAmount;
