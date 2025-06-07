"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

import { updateUserBalance, updateBankBalance } from "@/app/actions/helpers";

import { ActionResponse } from "@/app/types";

interface DeleteTransactionDTO {
  userId: string;
  transactionId: string;
}

export const deleteTransaction = async ({
  userId,
  transactionId,
}: DeleteTransactionDTO): Promise<ActionResponse> => {
  if (!userId) {
    return {
      success: false,
      type: "unauthorized",
      error: "Usuário não autenticado.",
    };
  }

  if (!transactionId) {
    return {
      success: false,
      type: "validation_error",
      error: "Transação não informada.",
    };
  }

  const [user, transaction] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.transaction.findUnique({
      where: { id: transactionId },
      include: { user: true, bank: true },
    }),
  ]);

  if (!user) {
    return {
      success: false,
      type: "not_found",
      error: "Usuário não encontrado.",
    };
  }

  if (!transaction) {
    return {
      success: false,
      type: "not_found",
      error: "Transação não encontrada.",
    };
  }

  const { type, amount, bank } = transaction;

  await updateUserBalance(
    userId,
    type as "income" | "expense",
    amount.toNumber(),
    "reverse",
  );
  await updateBankBalance(
    bank.id,
    type as "income" | "expense",
    amount.toNumber(),
    "reverse",
  );

  await db.transaction.delete({
    where: { id: transactionId },
  });

  revalidatePath("/");

  return { success: true };
};
