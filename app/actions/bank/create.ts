"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateBankDTO {
  userEmail: string;
  name: string;
  icon: string;
  starting_balance?: number;
}

export const createBank = async ({
  userEmail,
  name,
  icon,
  starting_balance,
}: CreateBankDTO) => {
  if (!userEmail) return { error: "E-mail do usuário não informado." };
  if (!name || !icon) return { error: "Nome e ícone são obrigatórios." };

  const user = await db.user.findUnique({
    where: { email: userEmail },
    include: { banks: true },
  });
  if (!user) return { error: "Usuário não encontrado." };

  if (user.banks.find((bank) => bank.name === name))
    return { error: `${name} já está cadastrado.` };

  const balance = starting_balance ?? 0;

  await db.bank.create({
    data: {
      userId: user.id,
      name,
      icon,
      starting_balance: balance.toString(),
      current_balance: balance.toString(),
      updated_at: new Date(),
    },
  });

  if (balance > 0) {
    await db.user.update({
      where: { id: user.id },
      data: {
        balance: { increment: balance },
        updated_at: new Date(),
      },
    });
  }

  revalidatePath("/");
};
