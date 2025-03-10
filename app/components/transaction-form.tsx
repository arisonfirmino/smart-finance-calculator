"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";
import { Input } from "@/app/components/ui/input";
import InputValue from "@/app/components/input-value";
import SubmitButton from "@/app/components/submit-button";
import TypePicker from "@/app/components/type-picker";
import BankPicker from "@/app/components/bank-picker";
import DatePicker from "@/app/components/date-picker";

import { addTransaction } from "@/app/actions/transaction";

const schema = yup.object({
  label: yup.string().required(),
  value: yup.number().min(0.01).required(),
  type: yup.string().oneOf(["income", "expense"]).required(),
  bankId: yup.string().required(),
});

type TransactionFormData = yup.InferType<typeof schema>;

interface TransactionFormProps {
  onClose: () => void;
}

const TransactionForm = ({ onClose }: TransactionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: yupResolver(schema),
    defaultValues: { value: 0 },
  });

  const onSubmit = async (data: TransactionFormData) => {
    if (!session) return;

    setIsLoading(true);

    if (!date) {
      setError("Por favor, selecione uma data.");
      setIsLoading(false);
      return;
    }

    await addTransaction({
      userId: session.user.id,
      bankId: data.bankId,
      label: data.label,
      type: data.type,
      value: data.value / 100,
      date,
    });

    reset();
    setIsLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
      <Input
        placeholder="Titulo da transação"
        {...register("label")}
        className={cn(
          errors.label &&
            "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600",
        )}
      />

      <Controller
        name="value"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputValue value={value} onChange={onChange} error={errors.value} />
        )}
      />

      <TypePicker
        register={{ ...register("type") }}
        onChange={(value: string) =>
          setValue("type", value as "income" | "expense")
        }
      />

      <BankPicker
        register={{ ...register("bankId") }}
        onChange={(value: string) => setValue("bankId", value)}
      />

      <DatePicker date={date} setDate={setDate} />

      {error && <p className="text-center text-xs text-red-600">{error}</p>}

      <SubmitButton isLoading={isLoading}>Adicionar</SubmitButton>
    </form>
  );
};

export default TransactionForm;
