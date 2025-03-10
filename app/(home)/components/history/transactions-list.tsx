import TransactionItem from "@/app/(home)/components/history/transaction-item";

import { Prisma } from "@prisma/client";

interface TransactionsListProps {
  transactions: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <ul className="space-y-2.5">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <TransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
