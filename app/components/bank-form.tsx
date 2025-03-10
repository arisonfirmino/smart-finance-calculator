"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputValue from "@/app/components/input-value";
import SelectBank from "@/app/components/select-bank";
import SubmitButton from "@/app/components/submit-button";

import { isBankRegistered } from "@/app/helpers/isBankRegistered";
import { addBank } from "@/app/actions/bank";

const schema = yup.object({
  initialBalance: yup.number().required(),
});

type BankFormData = yup.InferType<typeof schema>;

export type Bank = {
  name: string;
  icon: string;
};

interface BankFormProps {
  onClose: () => void;
}

const BankForm = ({ onClose }: BankFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankFormData>({
    resolver: yupResolver(schema),
    defaultValues: { initialBalance: 0 },
  });

  const onSubmit = async (data: BankFormData) => {
    if (!session) return;

    setIsLoading(true);

    if (!selectedBank) {
      setIsLoading(false);
      setError("Selecione um banco para continuar.");
      return;
    }

    const isAlreadyRegistered = await isBankRegistered({
      userId: session.user.id,
      bankName: selectedBank.name,
    });

    if (isAlreadyRegistered) {
      setError("Este banco já está cadastrado na sua conta.");
      setIsLoading(false);
      return;
    }

    await addBank({
      userId: session.user.id,
      name: selectedBank.name,
      icon: selectedBank.icon,
      initial_balance: data.initialBalance / 100,
    });

    reset();
    setIsLoading(false);
    setSelectedBank(null);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
      <SelectBank setSelectedBank={setSelectedBank} />
      <Controller
        name="initialBalance"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputValue
            value={value}
            onChange={onChange}
            error={errors.initialBalance}
          />
        )}
      />

      {error && <p className="text-center text-xs text-red-600">{error}</p>}

      <SubmitButton isLoading={isLoading}>Adicionar</SubmitButton>
    </form>
  );
};

export default BankForm;
