"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteTransactionDTO {
  userEmail: string;
  transactionId: string;
}

export const deleteTransaction = async ({
  userEmail,
  transactionId,
}: DeleteTransactionDTO) => {
  if (!userEmail)
    throw new Error(
      "Não foi possível identificar o seu usuário. Por favor, tente novamente.",
    );

  const user = await db.user.findUnique({ where: { email: userEmail } });
  if (!user)
    throw new Error(
      "Usuário não encontrado. Verifique se você está logado corretamente.",
    );

  if (!transactionId)
    throw new Error("Nenhuma transação selecionada para excluir.");

  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
    include: { user: true, bank: true },
  });
  if (!transaction) throw new Error("Transação não encontrada ou já excluída.");

  if (transaction.user.id !== user.id)
    throw new Error("Você não tem permissão para excluir essa transação.");

  await db.transaction.delete({ where: { id: transactionId } });

  if (transaction.type === "income") {
    await db.user.update({
      where: { id: user.id },
      data: {
        balance: { decrement: transaction.amount },
        total_income: { decrement: transaction.amount },
        updated_at: new Date(),
      },
    });

    await db.bank.update({
      where: { id: transaction.bank.id },
      data: {
        current_balance: { decrement: transaction.amount },
        updated_at: new Date(),
      },
    });
  } else {
    await db.user.update({
      where: { id: user.id },
      data: {
        balance: { increment: transaction.amount },
        total_expenses: { decrement: transaction.amount },
        updated_at: new Date(),
      },
    });

    await db.bank.update({
      where: { id: transaction.bank.id },
      data: {
        current_balance: { increment: transaction.amount },
        updated_at: new Date(),
      },
    });
  }

  revalidatePath("/");
};

export const deleteAllTransactions = async ({
  userEmail,
}: {
  userEmail: string;
}) => {
  if (!userEmail)
    throw new Error(
      "Não foi possível identificar o seu usuário. Por favor, tente novamente.",
    );

  const user = await db.user.findUnique({
    where: { email: userEmail },
    include: { banks: true, transactions: true },
  });
  if (!user)
    throw new Error(
      "Usuário não encontrado. Verifique se você está logado corretamente.",
    );

  if (user.transactions.length === 0)
    throw new Error("Nenhuma transação encontrada para ser excluída.");

  await db.transaction.deleteMany({ where: { userId: user.id } });

  await Promise.all(
    user.banks.map((bank) =>
      db.bank.update({
        where: { id: bank.id },
        data: {
          current_balance: bank.starting_balance,
          updated_at: new Date(),
        },
      }),
    ),
  );

  await db.user.update({
    where: { id: user.id },
    data: {
      total_income: 0,
      total_expenses: 0,
      balance: user.banks.reduce(
        (acc, bank) => acc + Number(bank.starting_balance),
        0,
      ),
      updated_at: new Date(),
    },
  });

  revalidatePath("/");
};
