import NewBank from "@/app/components/bank/new-bank";
import BankItem from "@/app/components/bank/bank-item";

import { Bank } from "@prisma/client";

interface BanksListProps {
  banks: Bank[];
}

const BanksList = ({ banks }: BanksListProps) => {
  return (
    <div className="flex items-center gap-5 overflow-x-auto p-5 [&::-webkit-scrollbar]:hidden">
      <NewBank />

      <ul className="flex items-center gap-3">
        {banks.map((bank) => (
          <li key={bank.id}>
            <BankItem bank={bank} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BanksList;
