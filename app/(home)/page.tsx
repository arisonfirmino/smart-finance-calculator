import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";

import Header from "@/app/components/header";
import BanksList from "@/app/components/banks/banks-list";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  return (
    <main>
      <Header />
      <BanksList />
    </main>
  );
};

export default Home;
