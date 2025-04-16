import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import BankBadge from "@/app/components/bank/bank-badge";

interface BankPickerProps {
  banks: any[];
  onSelect: (bank: any) => void;
}

const BankPicker = ({ banks, onSelect }: BankPickerProps) => {
  return (
    <Select
      onValueChange={(value) => {
        const selectedBank = banks.find((bank) => bank.name === value);
        if (selectedBank) {
          onSelect(selectedBank);
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um banco" />
      </SelectTrigger>
      <SelectContent>
        {banks.map((bank: any) => (
          <SelectItem key={bank.name} value={bank.name}>
            <BankBadge bank={bank} showName={true} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default BankPicker;
