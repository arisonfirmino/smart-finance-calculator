import { User } from "@prisma/client";

export interface BalanceProps {
  user: Pick<User, "image" | "update_at" | "balance">;
}

export interface TotalIncomesProps {
  user: Pick<User, "total_incomes">;
}

export interface TotalExpensesProps {
  user: Pick<User, "total_incomes">;
}
