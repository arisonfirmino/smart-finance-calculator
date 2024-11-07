import Transaction from "@/components/transaction";
import { TransactionHistoryProps } from "@/types";

const TransactionHistory = ({
  userId,
  transactions,
}: TransactionHistoryProps) => {
  return (
    <>
      {transactions.map((transaction) => (
        <ul key={transaction.id}>
          <li>
            <Transaction userId={userId} transaction={transaction} />
          </li>
        </ul>
      ))}
    </>
  );
};

export default TransactionHistory;
