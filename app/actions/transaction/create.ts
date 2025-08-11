"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateTransactionDTO {
  userEmail: string;
  bankId: string;
  type: string;
  title: string;
  amount: number;
  date: Date;
}

export const createTransaction = async ({
  userEmail,
  bankId,
  type,
  title,
  amount,
  date,
}: CreateTransactionDTO) => {
  if (!userEmail) return { error: "E-mail do usuário não fornecido." };

  const user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user) return { error: "Usuário não encontrado." };

  if (!bankId) return { error: "ID do banco não fornecido." };

  const bank = await db.bank.findUnique({
    where: { id: bankId },
    include: { user: true },
  });
  if (!bank) return { error: "Banco não encontrado" };

  if (bank.user.id !== user.id)
    return { error: "Banco não pertence ao usuário." };

  if (!type) return { error: "Tipo de transação não fornecido." };
  if (type !== "income" && type !== "expense")
    return { error: "Tipo de transação inválido. Use 'income' ou 'expense'." };

  if (!title) return { error: "Título da transação não fornecido." };

  if (!amount) return { error: "Valor da transação não fornecido." };
  if (amount <= 0)
    return { error: "O valor da transação deve ser maior que zero." };

  if (!date) return { error: "Data da transação não fornecida." };

  if (type === "expense" && amount > Number(bank.current_balance))
    return { error: "Saldo insuficiente para essa transação." };

  await db.transaction.create({
    data: { userId: user.id, bankId, type, title, amount, date },
  });

  if (type === "income") {
    await db.user.update({
      where: { email: userEmail },
      data: {
        balance: { increment: amount },
        total_income: { increment: amount },
        updated_at: new Date(),
      },
    });

    await db.bank.update({
      where: { id: bankId },
      data: { current_balance: { increment: amount }, updated_at: new Date() },
    });
  } else {
    await db.user.update({
      where: { email: userEmail },
      data: {
        balance: { decrement: amount },
        total_expenses: { increment: amount },
        updated_at: new Date(),
      },
    });

    await db.bank.update({
      where: { id: bankId },
      data: { current_balance: { decrement: amount }, updated_at: new Date() },
    });
  }

  revalidatePath("/");
};
