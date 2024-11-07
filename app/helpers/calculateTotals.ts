import { db } from "@/app/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export const calculateTotalIncomes = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { incomes: true },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const totalIncomes = user.incomes.reduce(
    (total, income) => total.plus(new Decimal(income.value)),
    new Decimal(0),
  );

  return totalIncomes;
};

export const calculateTotalExpenses = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { expenses: true },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const totalExpenses = user.expenses.reduce(
    (total, expense) => total.plus(new Decimal(expense.value)),
    new Decimal(0),
  );

  return totalExpenses;
};

export const calculateBalance = async (userId: string) => {
  const totalIncomes = await calculateTotalIncomes(userId);
  const totalExpenses = await calculateTotalExpenses(userId);
  return totalIncomes.minus(totalExpenses);
};
