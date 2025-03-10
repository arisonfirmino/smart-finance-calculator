import { cn } from "@/app/lib/utils";

import { Input } from "@/app/components/ui/input";

import { FieldError } from "react-hook-form";

interface InputValueProps {
  value: number;
  error: FieldError | undefined;
  onChange: (e: number) => void;
}

const InputValue = ({ value, error, onChange }: InputValueProps) => {
  const formatCurrency = (value: number) =>
    (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const parseCurrency = (value: string) =>
    parseInt(value.replace(/\D/g, ""), 10) || 0;

  return (
    <Input
      value={formatCurrency(value)}
      onChange={(e) => onChange(parseCurrency(e.target.value))}
      className={cn(error && "border-red-600 focus-visible:ring-red-600")}
    />
  );
};

export default InputValue;
