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
import Search from "@/app/components/search";
import FinancialChart from "@/app/components/chart/financial-chart";
import TransactionsList from "@/app/components/transaction/transactions-list";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser(session.user.id);

  if (!user) return null;

  return (
    <main className="flex flex-col md:flex-row">
      <Header user={user} />

      <div className="border-border/10 hidden w-full max-w-xs flex-col border-r xl:flex">
        <p className="p-5 text-center text-sm font-semibold uppercase">
          Configurações
        </p>
        <Separator />
        <LateralMenu user={user} />
      </div>

      <Container>
        <div className="flex items-center justify-between pt-5 md:pt-0">
          <ButtonsPanelMobile user={user} />
          <Balance user={user} />
        </div>

        <Separator className="bg-accent/5 hidden md:flex" />

        <div className="bg-background flex-1 gap-5 rounded-t-3xl md:flex md:flex-col md:rounded-t-none md:bg-transparent">
          <div className="flex justify-between">
            <TotalAmount user={user} />
            <ButtonsPanelDesktop user={user} />
          </div>

          <Separator className="bg-accent/5 hidden md:flex" />

          <div className="flex gap-5">
            <Search />
            <FinancialChart user={user} />
          </div>

          {user.transactions.length > 0 && (
            <TransactionsList transactions={user.transactions} />
          )}
        </div>
      </Container>
    </main>
  );
};

export default Home;
