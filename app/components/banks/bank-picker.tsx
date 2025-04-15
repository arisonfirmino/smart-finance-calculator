import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import BankBadge from "@/app/components/banks/bank-badge";

const BankPicker = ({ banks }: { banks: any }) => {
  return (
    <Select>
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
