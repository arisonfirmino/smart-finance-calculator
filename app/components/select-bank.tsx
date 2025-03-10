import banks from "@/banks.json";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import BankItem from "@/app/components/bank-item";

import { BankType } from "@/app/components/bank-form";

interface SelectBankProps {
  setSelectedBank: (value: BankType | null) => void;
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
            <BankItem icon={bank.icon} name={bank.name} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBank;
