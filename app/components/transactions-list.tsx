import TransactionItem from "@/app/components/transaction-item";

import { sortTransactions } from "@/app/helpers/sortTransactions";

import { Transaction } from "@/app/types";

const TransactionsList = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div className="flex flex-col gap-6 px-5 md:p-0">
      <span className="text-foreground/50 text-xs font-medium uppercase">
        Histórico
      </span>

      <ul className="space-y-5">
        {sortTransactions(transactions).map((transaction) => (
          <li key={transaction.id} className="border-b pb-2.5">
            <TransactionItem transaction={transaction} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
