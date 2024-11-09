import Transaction from "@/components/transaction";
import { TransactionViewerProps } from "@/types";

const TransactionHistory = ({
  userId,
  transactions,
}: TransactionViewerProps) => {
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
