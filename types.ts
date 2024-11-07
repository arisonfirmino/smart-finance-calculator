import { Expense, Income, User } from "@prisma/client";

// actions

export interface CreateNewTransaction {
  userId: string;
  title: string;
  value: number;
  date: Date;
}

// components

export interface BalanceProps {
  user: Pick<User, "name" | "image" | "update_at" | "balance">;
}

export interface TotalIncomesProps {
  user: Pick<User, "total_incomes">;
}

export interface TotalExpensesProps {
  user: Pick<User, "total_expenses">;
}

export interface FormProps {
  user: Pick<User, "id">;
}

export interface TransactionFormProps {
  userId: string;
  setTransactionType: () => void;
  handleSubmitForm: (data: {
    userId: string;
    title: string;
    value: number;
    date: Date;
  }) => void;
}

export interface FormData {
  title: string;
  value: string;
}

export interface TransactionProps {
  userId: string;
  transaction: Income | Expense;
}

export interface TransactionHistoryProps {
  userId: string;
  transactions: (Income | Expense)[];
}

export interface DeleteTransactionProps {
  userId: string;
  transaction: Pick<Income | Expense, "id" | "type">;
}
