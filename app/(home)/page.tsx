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

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser({ id: session.user.id });

  if (!user) return null;

  return (
    <section className="flex flex-col gap-5 md:flex-row">
      <div className="w-full space-y-5">
        <Card className="overflow-hidden rounded-2xl">
          <CardHeader className="bg-primary flex items-center justify-between p-1.5 pr-3">
            <div className="flex items-center gap-2">
              <UserAvatar user={user} />
              <Greeting name={user.name} />
            </div>

            <LogOutButton />
          </CardHeader>

          <CardContent className="p-2">
            <Balance />
          </CardContent>
        </Card>

        <BanksSheet />
      </div>

      <div className="w-full">Histórico</div>
    </section>
  );
};

export default Home;
