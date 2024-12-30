import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

import TransactionsList from "@/app/components/transactions-list";

const TransactionsWrapper = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      incomes: {
        orderBy: [{ date: "desc" }, { created_at: "desc" }],
      },
      expenses: {
        orderBy: [{ date: "desc" }, { created_at: "desc" }],
      },
    },
  });

  if (!user) return null;

  const transactions = [
    ...user.incomes.map((income) => ({ ...income, type: "income" })),
    ...user.expenses.map((expense) => ({ ...expense, type: "expense" })),
  ].sort((a, b) => {
    if (a.date.getTime() !== b.date.getTime()) {
      return b.date.getTime() - a.date.getTime();
    }

    return b.created_at.getTime() - a.created_at.getTime();
  });

  return (
    <TransactionsList
      userId={user.id}
      transactions={JSON.parse(JSON.stringify(transactions))}
    />
  );
};

export default TransactionsWrapper;
