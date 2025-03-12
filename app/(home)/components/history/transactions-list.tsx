import TransactionItem from "@/app/(home)/components/history/transaction-item";
import { sortTransactions } from "@/app/helpers/sortTransactions";

import { Prisma } from "@prisma/client";

interface TransactionsListProps {
  transactions: Prisma.TransactionGetPayload<{
    include: { bank: true };
  }>[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  const filteredTransactions = sortTransactions({ transactions });

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
