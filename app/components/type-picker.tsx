import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";

import { UseFormRegisterReturn } from "react-hook-form";

interface TypePickerProps {
  register: UseFormRegisterReturn;
  onChange: (value: string) => void;
}

const TypePicker = ({ register, onChange }: TypePickerProps) => {
  return (
    <Select {...register} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="expense">Despesa</SelectItem>
        <SelectItem value="income">Receita</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default TypePicker;
