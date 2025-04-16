import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/app/helpers/getUser";

import Header from "@/app/components/header";
import BanksList from "@/app/components/bank/banks-list";
import TransactionsList from "@/app/components/transaction/transactions-list";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUser(session.user.id);

  if (!user) return null;

  return (
    <main>
      <Header user={user} />
      <BanksList banks={user.banks} />
      <TransactionsList transactions={user.transactions} />
    </main>
  );
};

export default Home;
