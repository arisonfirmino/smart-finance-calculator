import Header from "@/components/header";
import Balance from "@/components/balance";

const Home = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-5">
      <Header />
      <div className="w-full max-w-xl">
        <Balance />
      </div>
    </main>
  );
};

export default Home;
