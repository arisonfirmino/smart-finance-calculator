import TransactionItem from "@/app/components/transaction/transaction-item";

import { formatDate } from "@/app/helpers/formatDate";

import {
  sortTransactions,
  TransactionsProps,
} from "@/app/helpers/sortTransactions";

import { Prisma } from "@prisma/client";

const TransactionsList = ({ transactions }: TransactionsProps) => {
  const filteredTransactions = sortTransactions({ transactions }).reduce<
    Record<string, Prisma.TransactionGetPayload<{ include: { bank: true } }>[]>
  >((acc, transaction) => {
    if (!acc[formatDate(transaction.date)]) {
      acc[formatDate(transaction.date)] = [];
    }

    acc[formatDate(transaction.date)].push(transaction);

    return acc;
  }, {});

  return (
    <div className="border-border/10 border-t">
      {Object.entries(filteredTransactions).map(([date, transactions]) => (
        <div key={date}>
          <h3 className="px-5 pt-5 text-xs font-medium uppercase">{date}</h3>

          <ul className="space-y-2">
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <TransactionItem transaction={transaction} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;
