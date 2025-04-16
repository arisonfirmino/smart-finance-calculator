import { db } from "@/app/lib/prisma";

export const getUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      banks: {
        orderBy: { created_at: "desc" },
      },
    },
  });

  return JSON.parse(JSON.stringify(user));
};
