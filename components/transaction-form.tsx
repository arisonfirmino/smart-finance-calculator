"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { formatDateLong } from "@/app/helpers/formatDate";
import { TransactionFormProps, FormData } from "@/types";

const schema = yup.object({
  title: yup.string().required("Este campo é obrigatório."),
  value: yup.string().required("Este campo é obrigatório."),
});

const TransactionForm = ({
  userId,
  setTransactionType,
  handleSubmitForm,
}: TransactionFormProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formattedValue, setFormattedValue] = useState("0,00");

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
    if (!date) {
      return;
    }

    const numericValue =
      parseFloat(formattedValue.replace(/\D/g, "") || "0") / 100;

    const formData = {
      userId: userId,
      title: data.title,
      value: numericValue.toFixed(2),
      date: date,
    };

    await handleSubmitForm(formData);

    reset();
    setFormattedValue("0,00");
    setTransactionType();
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
        <div className="w-full">
          <Input
            placeholder="Título da transação"
            {...register("title")}
            className={
              errors.title ? "border-red-600 focus-visible:ring-red-600" : ""
            }
          />
          {errors.title && (
            <small className="text-red-600">{errors.title.message}</small>
          )}
        </div>
        <div className="w-full">
          <Input
            placeholder="Valor da transação"
            value={formattedValue}
            onChange={handleValueChange}
            className={
              errors.value ? "border-red-600 focus-visible:ring-red-600" : ""
            }
          />
          {errors.value && (
            <small className="text-red-600">{errors.value.message}</small>
          )}
        </div>
      </div>

      <div className="relative flex justify-between">
        <Button className="uppercase">Adicionar</Button>
        {showCalendar ? (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              setShowCalendar(false);
            }}
            className="absolute right-0 top-0 z-10 rounded-xl border bg-card"
          />
        ) : (
          <Button
            onClick={() => setShowCalendar(true)}
            className={`uppercase ${!date ? "border border-red-600" : ""}`}
          >
            {date ? `${formatDateLong(date)}` : "Selecione uma data"}
          </Button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
