import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import BankIcon from "@/app/components/bank-icon";

import { Bank } from "@/app/types";

interface BankPickerProps {
  banks: any;
  setBank: (bank: Bank) => void;
}

const BankPicker = ({ banks, setBank }: BankPickerProps) => {
  return (
    <Select
      onValueChange={(value) => {
        const selectedBank = banks.find((bank: any) => bank.name === value);
        if (selectedBank) setBank(selectedBank);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um banco" />
      </SelectTrigger>

      <SelectContent>
        {banks.map((bank: any) => (
          <SelectItem key={bank.name} value={bank.name}>
            <BankIcon bank={bank} />
            {bank.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BankPicker;
