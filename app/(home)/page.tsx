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

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser({ id: session.user.id });

  if (!user) return null;

  return (
    <section className="flex flex-col gap-5 md:flex-row">
      <div className="w-full space-y-5">
        <Card className="rounded-2xl">
          <CardHeader className="pr-3">
            <div className="flex items-center gap-2">
              <UserAvatar user={user} />
              <Greeting name={user.name} />
            </div>

            <LogOutButton />
          </CardHeader>

          <CardContent className="p-2">
            <Balance user={JSON.parse(JSON.stringify(user))} />
          </CardContent>
        </Card>

        <BanksSheet />

        <div className="flex gap-5">
          <TotalAmount type="income" total={500} />
          <TotalAmount type="expense" total={500} />
        </div>
      </div>

      <TransactionHistory />
    </section>
  );
};

export default Home;
