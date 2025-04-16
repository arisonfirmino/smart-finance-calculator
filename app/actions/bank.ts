"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddBankProps {
  userId: string;
  name: string;
  icon: string;
  initial_value?: number;
}

export const addBank = async ({
  userId,
  name,
  icon,
  initial_value,
}: AddBankProps) => {
  if (!userId) throw new Error("O ID do usuário é obrigatório.");

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { banks: true },
  });

  if (!user)
    return { error: "Usuário não encontrado. Verifique o ID fornecido." };

  if (!name || !icon)
    return { error: "É necessário informar o nome e o ícone do banco." };

  if (user.banks.find((bank) => bank.name === name))
    return { error: `${name} já está cadastrado na sua conta.` };

  await db.bank.create({
    data: {
      userId,
      name,
      icon,
      initial_value,
      current_value: initial_value,
    },
  });

  if (initial_value) {
    await db.user.update({
      where: { id: userId },
      data: {
        balance: {
          increment: initial_value,
        },
      },
    });
  }

  revalidatePath("/");
};
