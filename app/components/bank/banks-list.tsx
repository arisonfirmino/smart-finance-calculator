import NewBank from "@/app/components/bank/new-bank";
import BankItem from "@/app/components/bank/bank-item";

const BanksList = () => {
  return (
    <div className="flex items-center gap-5 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
      <NewBank />

      <ul className="flex gap-3">
        <li>
          <BankItem />
        </li>
      </ul>
    </div>
  );
};

export default BanksList;
