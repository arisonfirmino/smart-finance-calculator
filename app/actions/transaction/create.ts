"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

import { updateUserBalance, updateBankBalance } from "@/app/actions/helpers";

import { ActionResponse } from "@/app/types";

interface CreateTransactionDTO {
  userId: string;
  bankId: string;
  title: string;
  type: "income" | "expense";
  amount: number;
  date: Date;
}

export const createTransaction = async ({
  userId,
  bankId,
  title,
  type,
  amount,
  date,
}: CreateTransactionDTO): Promise<ActionResponse> => {
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

  if (!title || !type || !amount || !date) {
    return {
      success: false,
      type: "validation_error",
      error: "Preencha todos os campos obrigatórios.",
    };
  }

  await updateUserBalance(userId, type, amount, "apply");
  await updateBankBalance(bankId, type, amount, "apply");

  await db.transaction.create({
    data: {
      userId,
      bankId,
      title,
      type,
      amount,
      date,
    },
  });

  revalidatePath("/");

  return { success: true };
};
