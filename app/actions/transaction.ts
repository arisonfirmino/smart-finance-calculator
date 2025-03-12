"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddTransactionProps {
  userId: string;
  bankId: string;
  type: "income" | "expense";
  label: string;
  value: number;
  date: Date;
}

export const addTransaction = async ({
  userId,
  bankId,
  type,
  label,
  value,
  date,
}: AddTransactionProps) => {
  if (!userId || !bankId || !type || !label || !value || !date)
    throw new Error("");

  const [user, bank] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.bank.findUnique({ where: { id: bankId } }),
  ]);

  if (!user) throw new Error("");
  if (!bank) throw new Error("");

  await db.transaction.create({
    data: { userId, bankId, type, label, value, date },
  });

  await db.user.update({
    where: { id: userId },
    data: {
      balance: type === "income" ? { increment: value } : { decrement: value },
      total_incomes: type === "income" ? { increment: value } : undefined,
      total_expenses: type === "expense" ? { increment: value } : undefined,
    },
  });

  await db.bank.update({
    where: { id: bankId },
    data: {
      current_balance:
        type === "income" ? { increment: value } : { decrement: value },
    },
  });

  revalidatePath("/");
};

export const deleteTransaction = async ({ id }: { id: string }) => {
  if (!id) throw new Error("");

  const transaction = await db.transaction.findUnique({
    where: { id },
    include: { user: true, bank: true },
  });

  if (!transaction) throw new Error("");

  await db.transaction.delete({
    where: { id },
  });

  await db.bank.update({
    where: { id: transaction.bank.id },
    data: {
      current_balance:
        transaction.type === "income"
          ? { decrement: transaction.value }
          : { increment: transaction.value },
    },
  });

  await db.user.update({
    where: { id: transaction.user.id },
    data: {
      balance:
        transaction.type === "income"
          ? { decrement: transaction.value }
          : { increment: transaction.value },
      total_incomes:
        transaction.type === "income"
          ? { decrement: transaction.value }
          : undefined,
      total_expenses:
        transaction.type === "expense"
          ? { decrement: transaction.value }
          : undefined,
    },
  });

  revalidatePath("/");
};
