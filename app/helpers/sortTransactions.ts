import { Transaction } from "@/app/types";

export const sortTransactions = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (dateA !== dateB) return dateB - dateA;

    const createdA = new Date(a.created_at).getTime();
    const createdB = new Date(b.created_at).getTime();

    return createdB - createdA;
  });
};
