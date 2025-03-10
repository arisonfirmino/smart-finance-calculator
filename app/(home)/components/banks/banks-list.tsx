import BankItem from "@/app/(home)/components/banks/bank-item";

import { Bank } from "@prisma/client";

interface BanksListProps {
  banks: Bank[];
}

const BanksList = ({ banks }: BanksListProps) => {
  return (
    <ul className="space-y-2.5">
      {banks.map((bank) => (
        <li key={bank.id}>
          <BankItem bank={bank} />
        </li>
      ))}
    </ul>
  );
};

export default BanksList;
