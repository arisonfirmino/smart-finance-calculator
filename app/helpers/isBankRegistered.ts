"use server";

import { db } from "@/app/lib/prisma";

export const isBankRegistered = async ({
  userId,
  bankName,
}: {
  userId: string;
  bankName: string;
}) => {
  if (!userId || !bankName) return false;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { banks: true },
  });

  if (!user) return false;

  if (user.banks.find((bank) => bank.name === bankName)) {
    return true;
  } else {
    return false;
  }
};
