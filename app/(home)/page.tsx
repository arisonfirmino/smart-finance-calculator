import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/app/helpers/getUser";

import Header from "@/app/components/header/header";
import { Separator } from "@/app/components/ui/separator";
import ButtonsPanel from "@/app/components/buttons-panel";
import Balance from "@/app/components/balance";
import Container from "@/app/components/container";
import TotalAmount from "@/app/components/total-amount";
import Search from "@/app/components/search";
import FinancialChart from "@/app/components/chart/financial-chart";
import TransactionsList from "@/app/components/transaction/transactions-list";
import LateralMenu from "@/app/components/menu/lateral-menu";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser(session.user.id);

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col md:flex-row md:justify-center">
      <div className="md:hidden">
        <Header user={user} />
      </div>

      <Separator
        orientation="vertical"
        className="hidden min-h-screen min-w-1 md:block"
      />

      <Container>
        <div className="bg-muted flex items-center justify-between gap-5 py-5">
          <ButtonsPanel user={user} />
          <Balance user={user} />
        </div>

        <div className="bg-background flex-1 rounded-t-3xl">
          <TotalAmount user={user} />

          <div className="flex gap-5 px-5">
            <Search />
            <FinancialChart user={user} />
          </div>

          {user.transactions.length > 0 ? (
            <TransactionsList transactions={user.transactions} />
          ) : (
            <p className="text-foreground/50 text-center text-sm">
              Seu histórico está vazio por enquanto.
            </p>
          )}
        </div>
      </Container>

      <Separator
        orientation="vertical"
        className="hidden min-h-screen min-w-1 md:block"
      />

      <div className="hidden max-w-80 md:block md:min-w-80">
        <LateralMenu user={user} />
      </div>

      <Separator
        orientation="vertical"
        className="hidden min-h-screen min-w-1 md:block"
      />
    </main>
  );
};

export default Home;
