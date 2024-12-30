import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/prisma";

import Header from "@/app/components/header";
import Balance from "@/app/components/balance";
import SignOutButton from "@/app/components/signout-button";
import TransactionCard from "@/app/components/transaction-card";
import TransactionForm from "@/app/components/transaction-form";
import TransactionsWrapper from "@/app/components/transactions-wrapper";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 md:justify-center md:py-10 xl:w-[calc(100%-384px-40px)] xl:gap-10">
      <Header />

      <div className="w-full max-w-xl space-y-5 px-5 md:px-0">
        <Balance user={JSON.parse(JSON.stringify(user))} />

        <SignOutButton />

        <div className="flex gap-5">
          <TransactionCard type="Income" total={Number(user.total_incomes)} />
          <TransactionCard type="Expense" total={Number(user.total_expenses)} />
        </div>

        <p className="font-semibold uppercase">Adicionar nova transação</p>

        <TransactionForm />
      </div>

      <div className="left-[calc(100%-576px+40px)] top-0 hidden w-full md:flex md:max-w-xl xl:fixed xl:h-screen xl:max-w-96 xl:border-x xl:bg-background">
        <TransactionsWrapper />
      </div>
    </main>
  );
};

export default Home;
