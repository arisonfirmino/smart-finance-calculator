import { db } from "@/app/lib/prisma";

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });

  return JSON.parse(JSON.stringify(user));
};
