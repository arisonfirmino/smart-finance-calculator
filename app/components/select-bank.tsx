import banks from "@/banks.json";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import BankBadge from "@/app/components/bank-badge";

import { Bank } from "@/app/components/bank-form";

interface SelectBankProps {
  setSelectedBank: (value: Bank | null) => void;
}

const SelectBank = ({ setSelectedBank }: SelectBankProps) => {
  return (
    <Select
      onValueChange={(value) => {
        setSelectedBank(banks.find((bank) => bank.name === value) || null);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um banco" />
      </SelectTrigger>
      <SelectContent>
        {banks.map((bank) => (
          <SelectItem key={bank.name} value={bank.name}>
            <BankBadge icon={bank.icon} name={bank.name} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBank;
