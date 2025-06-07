"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

import { incrementUserBalance } from "@/app/actions/helpers";

import { ActionResponse } from "@/app/types";

interface CreateBankDTO {
  userId: string;
  name: string;
  icon: string;
  amount?: number;
}

export const createBank = async ({
  userId,
  name,
  icon,
  amount,
}: CreateBankDTO): Promise<ActionResponse> => {
  if (!userId) {
    return {
      success: false,
      type: "unauthorized",
      error: "Usuário não autenticado.",
    };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { banks: true },
  });

  if (!user) {
    return {
      success: false,
      type: "not_found",
      error: "Usuário não encontrado.",
    };
  }

  if (!name || !icon) {
    return {
      success: false,
      type: "validation_error",
      error: "Nome e ícone são obrigatórios.",
    };
  }

  if (
    user.banks.find((bank) => bank.name.toLowerCase() === name.toLowerCase())
  ) {
    return {
      success: false,
      type: "conflict",
      error: `${name} já está cadastrado na sua conta.`,
    };
  }

  if (amount) {
    await incrementUserBalance(userId, amount);
  }

  await db.bank.create({
    data: {
      userId,
      name,
      icon,
      initial_value: amount,
      current_value: amount,
    },
  });

  revalidatePath("/");

  return { success: true };
};
