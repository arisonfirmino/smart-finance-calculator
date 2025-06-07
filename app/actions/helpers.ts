import { db } from "@/app/lib/prisma";

type TransactionType = "income" | "expense";
type Operation = "apply" | "reverse";

// Aplica ou reverte transação no saldo do usuário
export const updateUserBalance = async (
  userId: string,
  type: TransactionType,
  amount: number,
  operation: Operation,
) => {
  const isApply = operation === "apply";
  const balanceOp = isApply
    ? type === "income"
      ? { increment: amount }
      : { decrement: amount }
    : type === "income"
      ? { decrement: amount }
      : { increment: amount };

  const total_income =
    type === "income"
      ? isApply
        ? { increment: amount }
        : { decrement: amount }
      : undefined;

  const total_expenses =
    type === "expense"
      ? isApply
        ? { increment: amount }
        : { decrement: amount }
      : undefined;

  return db.user.update({
    where: { id: userId },
    data: {
      balance: balanceOp,
      total_income,
      total_expenses,
    },
  });
};

// Aplica ou reverte transação no saldo do banco
export const updateBankBalance = async (
  bankId: string,
  type: TransactionType,
  amount: number,
  operation: Operation,
) => {
  const isApply = operation === "apply";
  const current_value =
    type === "income"
      ? isApply
        ? { increment: amount }
        : { decrement: amount }
      : isApply
        ? { decrement: amount }
        : { increment: amount };

  return db.bank.update({
    where: { id: bankId },
    data: { current_value },
  });
};

// Incrementa saldo do usuário ao criar banco
export const incrementUserBalance = async (userId: string, amount: number) => {
  if (!amount) return;
  await db.user.update({
    where: { id: userId },
    data: { balance: { increment: amount } },
  });
};

// Ajusta saldo do usuário ao excluir banco
export const revertUserBalanceForBank = async (
  userId: string,
  bankId: string,
) => {
  const transactions = await db.transaction.findMany({
    where: { userId, bankId },
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const bank = await db.bank.findUnique({
    where: { id: bankId },
  });

  if (!bank) {
    return {
      success: false,
      type: "not_found",
      error: "Banco não encontrado.",
    };
  }

  await db.user.update({
    where: { id: userId },
    data: {
      balance: { decrement: Number(bank.current_value) },
      total_income: { decrement: totalIncome },
      total_expenses: { decrement: totalExpenses },
    },
  });
};
