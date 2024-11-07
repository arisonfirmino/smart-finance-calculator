import Header from "@/components/header";
import Balance from "@/components/balance";
import TotalIncomes from "@/components/total-incomes";
import TotalExpenses from "@/components/total-expenses";
import TransactionHistory from "@/components/transaction-history";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound, redirect } from "next/navigation";
import Form from "@/components/form";
import { db } from "@/app/lib/prisma";

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
      incomes: true,
      expenses: true,
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

  const sortedTransactions = transactions.sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-5">
      <Header />

      <div className="w-full max-w-xl space-y-5 px-5 pb-5 md:px-0">
        <Form user={user} />

        <Balance user={user} />

        <div className="flex gap-5">
          <TotalIncomes user={user} />
          <TotalExpenses user={user} />
        </div>

        <h3 className="font-semibold uppercase">Histórico de transações</h3>

        <TransactionHistory transactions={sortedTransactions} />
      </div>
    </main>
  );
};

export default Home;
