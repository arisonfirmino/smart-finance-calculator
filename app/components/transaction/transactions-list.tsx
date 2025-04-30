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

  return Object.entries(filteredTransactions).map(([date, transactions]) => (
    <div key={date} className="border-border/15 border-b md:border-none">
      <h3 className="text-xs font-medium uppercase">{date}</h3>

      <ul className="grid-cols-2 gap-x-5 md:grid">
        {transactions.map((transaction, index) => (
          <li key={transaction.id}>
            <TransactionItem
              transaction={transaction}
              isLast={index === transactions.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  ));
};

export default TransactionsList;
