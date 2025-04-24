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

interface DeleteBankProps {
  userId: string;
  bankId: string;
}

export const deleteBank = async ({ userId, bankId }: DeleteBankProps) => {
  if (!userId) throw new Error("O ID do usuário é obrigatório.");
  if (!bankId) throw new Error("O ID do banco é obrigatório.");

  const [user, bank, transactions] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.bank.findUnique({ where: { id: bankId }, include: { user: true } }),
    db.transaction.findMany({ where: { bankId } }),
  ]);

  if (!user)
    throw new Error("Usuário não encontrado. Verifique o ID fornecido.");
  if (!bank) throw new Error("Banco não encontrado. Verifique o ID fornecido.");

  if (bank.user.id !== userId)
    throw new Error(
      "Ação não autorizada. Este banco não pertence ao usuário informado.",
    );

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  await db.user.update({
    where: { id: userId },
    data: {
      balance: { decrement: bank.current_value },
      total_income: { decrement: totalIncome },
      total_expenses: { decrement: totalExpenses },
    },
  });

  await db.bank.delete({
    where: { id: bankId },
  });

  revalidatePath("/");
};
