import BankItem from "@/app/components/bank-item";

import { Bank } from "@/app/types";

const BanksList = ({ banks }: { banks: Bank[] }) => {
  return (
    <ul className="flex gap-2.5 overflow-auto px-5 md:flex-wrap md:p-0 [&::-webkit-scrollbar]:hidden">
      {banks.map((bank) => (
        <li key={bank.id}>
          <BankItem bank={bank} />
        </li>
      ))}
    </ul>
  );
};

export default BanksList;
