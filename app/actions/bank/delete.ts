"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

import { revertUserBalanceForBank } from "@/app/actions/helpers";

import { ActionResponse } from "@/app/types";

interface DeleteBankDTO {
  userId: string;
  bankId: string;
}

export const deleteBank = async ({
  userId,
  bankId,
}: DeleteBankDTO): Promise<ActionResponse> => {
  if (!userId) {
    return {
      success: false,
      type: "unauthorized",
      error: "Usuário não autenticado.",
    };
  }

  if (!bankId) {
    return {
      success: false,
      type: "validation_error",
      error: "Banco não informado.",
    };
  }

  const [user, bank] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.bank.findUnique({ where: { id: bankId }, include: { user: true } }),
  ]);

  if (!user) {
    return {
      success: false,
      type: "not_found",
      error: "Usuário não encontrado.",
    };
  }

  if (!bank) {
    return {
      success: false,
      type: "not_found",
      error: "Banco não encontrado.",
    };
  }

  if (bank.user.id !== userId) {
    return {
      success: false,
      type: "unauthorized",
      error: "Este banco não pertence ao usuário.",
    };
  }

  await revertUserBalanceForBank(userId, bankId);
  await db.bank.delete({ where: { id: bankId } });

  revalidatePath("/");

  return { success: true };
};
