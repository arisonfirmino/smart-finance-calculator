"use client";

import { useEffect, useState } from "react";

import { Input } from "@/app/components/ui/input";

import { formatCurrency } from "@/app/helpers/formatCurrency";

interface CurrencyInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyInput = ({ value, onChange }: CurrencyInputProps) => {
  const [currentValue, setCurrentValue] = useState<string>(String(value));

  useEffect(() => {
    if (!/\D/.test(String(value).replace(".", ""))) {
      setCurrentValue(formatCurrency(value));
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = event.target.value.replace(/\D/g, "");

    const cents = parseInt(numericValue || "0", 10);
    const floatValue = cents / 100;

    onChange({
      ...event,
      target: {
        ...event.target,
        value: String(floatValue),
      },
    });
  };

  return (
    <Input placeholder="R$ 0,00" value={currentValue} onChange={handleChange} />
  );
};

export default CurrencyInput;
