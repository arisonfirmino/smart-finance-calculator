import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound, redirect } from "next/navigation";

import Header from "@/app/components/header";
import Form from "@/app/components/form";
import Balance from "@/app/components/balance";
import SignOutButton from "@/app/components/signout-button";
import TotalIncomes from "@/app/components/total-incomes";
import TotalExpenses from "@/app/components/total-expenses";
import TransactionViewer from "@/app/components/transaction-viewer";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  if (!session.user?.email) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
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

  if (!user) {
    return notFound();
  }

  const transactions = [
    ...user.incomes.map((income) => ({
      ...income,
      value: income.value,
    })),
    ...user.expenses.map((expense) => ({
      ...expense,
      value: expense.value,
    })),
  ];

  const sortedTransactions = transactions.sort((a, b) => {
    if (a.date.getTime() !== b.date.getTime()) {
      return b.date.getTime() - a.date.getTime();
    }

    return b.created_at.getTime() - a.created_at.getTime();
  });

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-5">
      <div className="w-full max-w-xl space-y-5 px-5 py-5 md:px-0">
        <Header />

        <Form user={JSON.parse(JSON.stringify(user))} />

        <Balance user={JSON.parse(JSON.stringify(user))} />

        <SignOutButton />

        <div className="flex gap-5">
          <TotalIncomes user={JSON.parse(JSON.stringify(user))} />
          <TotalExpenses user={JSON.parse(JSON.stringify(user))} />
        </div>

        <TransactionViewer
          userId={user.id}
          transactions={JSON.parse(JSON.stringify(sortedTransactions))}
        />
      </div>
    </main>
  );
};

export default Home;
