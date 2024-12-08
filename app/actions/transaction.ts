"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateNewTransaction } from "@/app/types";
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

export const deleteTransaction = async ({
  userId,
  transactionId,
  type,
}: {
  userId: string;
  transactionId: string;
  type: string;
}) => {
  if (!userId) {
    throw new Error("Usuário não encontrado.");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (!transactionId) {
    throw new Error("Transação não encontrada.");
  }

  if (type === "income") {
    const income = await db.income.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!income) {
      throw new Error("Receita não encontrada.");
    }

    await db.income.delete({
      where: {
        id: income.id,
      },
    });
  } else if (type === "expense") {
    const expense = await db.expense.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!expense) {
      throw new Error("Despesa não encontrada.");
    }

    await db.expense.delete({
      where: {
        id: expense.id,
      },
    });
  }

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

export const deleteAllTransactions = async ({ userId }: { userId: string }) => {
  if (!userId) {
    throw new Error("Usuário não encontrado.");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  await db.income.deleteMany({
    where: {
      userId,
    },
  });

  await db.expense.deleteMany({
    where: {
      userId,
    },
  });

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      balance: 0.0,
      total_incomes: 0.0,
      total_expenses: 0.0,
      update_at: new Date(),
    },
  });

  revalidatePath("/");
};
