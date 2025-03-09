import TransactionItem from "@/app/(home)/components/history/transaction-item";

const TransactionsList = () => {
  return (
    <ul className="space-y-2.5">
      <li>
        <TransactionItem />
      </li>
    </ul>
  );
};

export default TransactionsList;
