"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteAllBanks = async ({ userEmail }: { userEmail: string }) => {
  if (!userEmail)
    throw new Error(
      "Não foi possível identificar o seu usuário. Por favor, tente novamente.",
    );

  const user = await db.user.findUnique({
    where: { email: userEmail },
    include: { banks: true },
  });
  if (!user)
    throw new Error(
      "Usuário não encontrado. Verifique se você está logado corretamente.",
    );

  if (user.banks.length === 0)
    throw new Error("Nenhum banco encontrado para ser excluído.");

  await db.bank.deleteMany({ where: { userId: user.id } });

  await db.user.update({
    where: { id: user.id },
    data: {
      balance: 0,
      total_income: 0,
      total_expenses: 0,
      updated_at: new Date(),
    },
  });

  revalidatePath("/");
};
