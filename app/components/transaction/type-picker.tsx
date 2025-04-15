import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";

interface TypePickerProps {
  type: "income" | "expense";
  setType: (type: "income" | "expense") => void;
}

const TypePicker = ({ type, setType }: TypePickerProps) => {
  return (
    <RadioGroup
      value={type}
      onValueChange={(value: "income" | "expense") => setType(value)}
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="expense" id="expense" />
        <Label htmlFor="expense">Despesa</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="income" id="income" />
        <Label htmlFor="income">Receita</Label>
      </div>
    </RadioGroup>
  );
};

export default TypePicker;
