import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/app/helpers/getUser";

import Header from "@/app/components/header/header";
import { Separator } from "@/app/components/ui/separator";
import LateralMenu from "@/app/components/menu/lateral-menu";
import Container from "@/app/components/container";
import ButtonsPanelMobile from "@/app/(home)/components/mobile/buttons-panel-mobile";
import Balance from "@/app/components/balance";
import TotalAmount from "@/app/components/total-amount";
import ButtonsPanelDesktop from "@/app/(home)/components/desktop/buttons-panel-desktop";
import FinancialChart from "@/app/components/chart/financial-chart";
import TransactionsSection from "@/app/(home)/components/transactions-section";
import UserAvatar from "@/app/components/user-avatar";
import NegativeBalanceAlert from "@/app/components/negative-balance-alert";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser(session.user.id);

  if (!user) return null;

  const hasTransactions = user.transactions.length > 0;

  return (
    <main className="flex flex-col xl:flex-row">
      <Header user={user} hasTransactions={hasTransactions} />

      <div className="border-border/10 hidden h-screen w-full max-w-xs flex-col overflow-y-scroll border-r xl:flex [&::-webkit-scrollbar]:hidden">
        <p className="p-5 text-center text-sm font-semibold uppercase">
          Configurações
        </p>

        {hasTransactions && <FinancialChart user={user} />}

        <Separator />

        <LateralMenu user={user} />
      </div>

      <Container>
        <div className="fixed top-5 right-5 hidden xl:flex">
          <UserAvatar user={user} />
        </div>

        <div className="flex items-center justify-between pt-5 md:pt-0">
          <ButtonsPanelMobile user={user} />
          <Balance user={user} />
        </div>

        <Separator className="bg-accent/5 hidden md:flex" />

        <div className="bg-background flex flex-1 flex-col gap-5 rounded-t-3xl p-5 md:rounded-t-none md:bg-transparent md:p-0 md:pb-10">
          <div className="flex justify-between">
            <TotalAmount user={user} />
            <ButtonsPanelDesktop user={user} />
          </div>

          <Separator className="bg-accent/5 hidden md:flex" />

          <TransactionsSection user={user} hasTransactions={hasTransactions} />
        </div>

        {user.balance < 0 && <NegativeBalanceAlert />}
      </Container>
    </main>
  );
};

export default Home;
