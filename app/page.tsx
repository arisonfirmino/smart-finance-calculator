import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/helpers/getUser";

import SignIn from "@/app/components/signin";
import Header from "@/app/components/header/header";
import EntriesPanel from "@/app/components/entries/entries-panel";
import Balance from "@/app/components/balance";
import { Separator } from "@/app/components/ui/separator";
import TotalAmount from "@/app/components/total-amount";
import TransactionsList from "@/app/components/transactions-list";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return <SignIn />;

  const user = await getUser(session.user.email);
  if (!user) return <SignIn />;

  return (
    <>
      <Header user={user} />
      <main className="bg-muted flex w-full flex-1 flex-col items-center rounded-t-3xl md:overflow-auto md:rounded-none xl:h-screen">
        <section className="flex w-full max-w-2xl flex-col md:gap-5 md:pt-10 xl:pt-28">
          <div className="flex justify-between py-5 pr-0 pl-10 md:p-0">
            <div className="md:hidden">
              <EntriesPanel user={user} />
            </div>
            <Balance user={user} />
          </div>

          <div className="bg-background flex flex-col gap-5 rounded-t-3xl md:rounded-none md:bg-transparent">
            <Separator className="hidden md:flex" />

            <div className="items-center justify-between md:flex">
              <TotalAmount user={user} />
              <div className="hidden md:flex">
                <EntriesPanel user={user} />
              </div>
            </div>

            <Separator className="hidden md:flex" />

            <TransactionsList transactions={user.transactions} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
