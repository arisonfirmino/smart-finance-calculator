import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/app/helpers/getUser";

import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import UserAvatar from "@/app/components/user-avatar";
import Greeting from "@/app/(home)/components/greeting";
import LogOutButton from "@/app/(home)/components/logout-button";
import Balance from "@/app/(home)/components/balance";
import BanksSheet from "@/app/(home)/components/banks/banks-sheet";
import TransactionHistory from "@/app/(home)/components/history/transaction-history";
import TotalAmount from "@/app/(home)/components/total-amount";

import { Transaction } from "@prisma/client";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser({ id: session.user.id });

  if (!user) return null;

  return (
    <section className="flex flex-col gap-5 md:flex-row">
      <div className="w-full space-y-5 md:max-w-1/2">
        <Card className="rounded-2xl">
          <CardHeader className="pr-3">
            <div className="flex items-center gap-2">
              <UserAvatar user={user} />
              <Greeting name={user.name} />
            </div>

            <LogOutButton />
          </CardHeader>

          <CardContent className="p-2">
            <Balance user={user} />
          </CardContent>
        </Card>

        <BanksSheet banks={user.banks} />

        <div className="flex gap-5">
          <TotalAmount
            type="income"
            total={Number(user.total_incomes)}
            transactions={user.transactions.filter(
              (t: Transaction) => t.type === "income",
            )}
          />
          <TotalAmount
            type="expense"
            total={Number(user.total_expenses)}
            transactions={user.transactions.filter(
              (t: Transaction) => t.type === "expense",
            )}
          />
        </div>
      </div>

      <TransactionHistory transactions={user.transactions} />
    </section>
  );
};

export default Home;
