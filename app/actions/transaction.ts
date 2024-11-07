"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateNewTransaction } from "@/types";
import {
  calculateBalance,
  calculateTotalIncomes,
  calculateTotalExpenses,
} from "@/app/helpers/calculateTotals";
import { Decimal } from "@prisma/client/runtime/library";

export const createNewIncome = async ({
  userId,
  title,
  value,
  date,
}: CreateNewTransaction) => {
  if (!userId) {
    throw new Error("Usuário não econtrado.");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não econtrado.");
  }

  await db.income.create({
    data: {
      userId: user.id,
      title,
      value: new Decimal(value),
      type: "income",
      date,
    },
  });

  const totalIncomes = await calculateTotalIncomes(user.id);
  const totalExpenses = await calculateTotalExpenses(user.id);
  const balance = await calculateBalance(user.id);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      balance: balance.toFixed(2),
      total_incomes: totalIncomes.toFixed(2),
      total_expenses: totalExpenses.toFixed(2),
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};

export const createNewExpense = async ({
  userId,
  title,
  value,
  date,
}: CreateNewTransaction) => {
  if (!userId) {
    throw new Error("Usuário não econtrado.");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não econtrado.");
  }

  await db.expense.create({
    data: {
      userId: user.id,
      title,
      value: new Decimal(value),
      type: "expense",
      date,
    },
  });

  const totalIncomes = await calculateTotalIncomes(user.id);
  const totalExpenses = await calculateTotalExpenses(user.id);
  const balance = await calculateBalance(user.id);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      balance: balance.toFixed(2),
      total_incomes: totalIncomes.toFixed(2),
      total_expenses: totalExpenses.toFixed(2),
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};
