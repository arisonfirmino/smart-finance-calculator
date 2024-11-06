import Header from "@/components/header";
import Balance from "@/components/balance";
import TotalIncomes from "@/components/total-incomes";
import TotalExpenses from "@/components/total-expenses";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-5">
      <Header />
      <div className="w-full max-w-xl space-y-5 px-5 md:px-0">
        <Balance />
        <div className="flex gap-5">
          <TotalIncomes />
          <TotalExpenses />
        </div>
        <h3 className="font-semibold uppercase">Histórico de transações</h3>
      </div>
    </main>
  );
};

export default Home;
