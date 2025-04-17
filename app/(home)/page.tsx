import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/app/helpers/getUser";

import Header from "@/app/components/header";
import BanksList from "@/app/components/bank/banks-list";
import FinancialChart from "@/app/components/chart/financial-chart";
import TransactionsList from "@/app/components/transaction/transactions-list";

import { SearchIcon } from "lucide-react";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser(session.user.id);

  if (!user) return null;

  return (
    <main>
      <Header user={user} />

      <BanksList banks={user.banks} />

      <div className="flex items-center justify-between p-5">
        <h2 className="font-semibold">Histórico</h2>
        <div className="item-center flex gap-5">
          <SearchIcon size={16} />
          <FinancialChart user={user} />
        </div>
      </div>

      {user.transactions.length > 0 ? (
        <TransactionsList transactions={user.transactions} />
      ) : (
        <p className="text-foreground/50 text-center text-sm">
          Seu histórico está vazio por enquanto.
        </p>
      )}
    </main>
  );
};

export default Home;
