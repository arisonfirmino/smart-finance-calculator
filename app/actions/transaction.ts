"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddTransactionProps {
  userId: string;
  bankId: string;
  title: string;
  type: "income" | "expense";
  amount: number;
  date: Date;
}

export const addTransaction = async ({
  userId,
  bankId,
  title,
  type,
  amount,
  date,
}: AddTransactionProps) => {
  if (!userId) return { error: "O ID do usuário é obrigatório." };
  if (!bankId) return { error: "O ID do banco é obrigatório." };

  const [user, bank] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.bank.findUnique({ where: { id: bankId }, include: { user: true } }),
  ]);

  if (!user)
    return { error: "Usuário não encontrado. Verifique o ID fornecido." };
  if (!bank)
    return { error: "Banco não encontrado. Verifique o ID fornecido." };

  if (bank.user.id !== userId)
    return {
      error:
        "Ação não autorizada. Este banco não pertence ao usuário informado.",
    };

  if (!title || !type || !amount || !date)
    return { error: "Todos os campos são obrigatórios." };

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

  await db.user.update({
    where: { id: userId },
    data: {
      balance:
        type === "income" ? { increment: amount } : { decrement: amount },
      total_incomes: type === "income" ? { increment: amount } : undefined,
      total_expenses: type === "expense" ? { increment: amount } : undefined,
    },
  });

  await db.bank.update({
    where: { id: bankId },
    data: {
      current_value:
        type === "income" ? { increment: amount } : { decrement: amount },
    },
  });

  revalidatePath("/");
};
