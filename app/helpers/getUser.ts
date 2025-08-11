import { db } from "@/app/lib/prisma";

export const getUser = async (email: string) => {
  if (!email) return null;

  const user = await db.user.findUnique({
    where: { email },
    include: {
      banks: {
        include: { transactions: true },
        orderBy: { updated_at: "desc" },
      },
      transactions: { include: { bank: true } },
    },
  });
  if (!user) return null;

  return JSON.parse(JSON.stringify(user));
};
