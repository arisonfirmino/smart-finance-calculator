"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

interface AddBankProps {
  userId: string;
  name: string;
  icon: string;
  initial_balance?: number;
}

export const addBank = async ({
  userId,
  name,
  icon,
  initial_balance,
}: AddBankProps) => {
  if (!userId) throw new Error("User ID is required.");

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { banks: true },
  });

  if (!user) throw new Error("User not found.");

  if (!name || !icon) throw new Error("Bank name and icon are required.");

  if (user.banks.find((bank) => bank.name === name))
    throw new Error("A bank with this name already exists.");

  await db.bank.create({
    data: {
      userId,
      name,
      icon,
      initial_balance,
      current_balance: initial_balance,
    },
  });

  if (initial_balance) {
    await db.user.update({
      where: { id: userId },
      data: {
        balance: { increment: initial_balance },
      },
    });
  }

  revalidatePath("/");
};
