import TransactionItem from "@/app/(home)/components/history/transaction-item";

import { Prisma } from "@prisma/client";

interface TransactionsListProps {
  transactions: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  const filteredTransactions = [...transactions].sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <ul className="space-y-2.5">
      {filteredTransactions.map((transaction) => (
        <li key={transaction.id}>
          <TransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
