"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { cn } from "@/app/lib/utils";

import { FormData } from "@/app/types";

import { CalendarIcon, LoaderCircleIcon, MoveRightIcon } from "lucide-react";

import { createNewExpense, createNewIncome } from "@/app/actions/transaction";
import { format } from "date-fns";

const schema = yup.object({
  title: yup.string().required("Este campo é obrigatório."),
  value: yup.string().required("Este campo é obrigatório."),
});

const TransactionForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formattedValue, setFormattedValue] = useState("0,00");
  const [type, setType] = useState<"income" | "expense">("expense");

  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    setIsLoading(true);

    if (!date) {
      setIsLoading(false);
      return;
    }

    const numericValue =
      parseFloat(formattedValue.replace(/\D/g, "") || "0") / 100;

    if (type === "expense") {
      await createNewExpense({
        userId: session.user.id,
        title: data.title,
        value: numericValue,
        date: date,
      });
    } else if (type === "income") {
      await createNewIncome({
        userId: session.user.id,
        title: data.title,
        value: numericValue,
        date: date,
      });
    }

    reset();
    setFormattedValue("0,00");
    setIsLoading(false);
    toast(`Nova ${type === "income" ? "receita" : "despesa"} adicionada.`);
  };

  const formatToCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const cents = parseInt(numericValue || "0", 10);
    const formatted = (cents / 100)
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formatted;
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatToCurrency(inputValue);
    setFormattedValue(formatted);
    setValue("value", formatted);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex gap-5">
        <Input
          placeholder="Título da transação"
          {...register("title")}
          className={cn(
            errors.title && "border-red-600 focus-visible:ring-red-600",
          )}
        />

        <Input
          placeholder="Valor da transação"
          value={formattedValue}
          onChange={handleValueChange}
          className={cn(
            errors.value && "border-red-600 focus-visible:ring-red-600",
          )}
        />
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "w-full justify-normal px-3",
                !date && "border-red-600 text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <RadioGroup
          defaultValue={type}
          onValueChange={(value) => setType(value as "income" | "expense")}
          className={cn("flex w-full gap-10 px-3 uppercase md:justify-center")}
        >
          <div className="flex items-center gap-2.5">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense">Despesa</Label>
          </div>
          <div className="flex items-center gap-2.5">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income">Receita</Label>
          </div>
        </RadioGroup>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full justify-between border-none uppercase hover:bg-green-500",
          isLoading && "bg-green-500",
        )}
      >
        {isLoading ? "Carregando" : "Adicionar"}
        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <MoveRightIcon />
        )}
      </Button>
    </form>
  );
};

export default TransactionForm;
