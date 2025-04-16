import { Prisma } from "@prisma/client";

export interface TransactionsProps {
  transactions: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>[];
}

export const sortTransactions = ({ transactions }: TransactionsProps) => {
  return [...transactions].sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};
