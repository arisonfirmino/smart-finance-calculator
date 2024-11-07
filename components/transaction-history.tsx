import Transaction from "@/components/transaction";
import { TransactionHistoryProps } from "@/types";

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <>
      {transactions.map((transaction) => (
        <ul key={transaction.id}>
          <li>
            <Transaction transaction={transaction} />
          </li>
        </ul>
      ))}
    </>
  );
};

export default TransactionHistory;
