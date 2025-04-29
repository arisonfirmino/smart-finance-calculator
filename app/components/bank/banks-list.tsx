import BankItem from "@/app/components/bank/bank-item";

import { Bank } from "@prisma/client";

interface BanksListProps {
  banks: Bank[];
}

const BanksList = ({ banks }: BanksListProps) => {
  return (
    <ul className="flex items-center gap-2.5 overflow-x-scroll px-5 md:px-0 [&::-webkit-scrollbar]:hidden">
      {banks.map((bank) => (
        <li key={bank.id}>
          <BankItem bank={bank} />
        </li>
      ))}
    </ul>
  );
};

export default BanksList;
