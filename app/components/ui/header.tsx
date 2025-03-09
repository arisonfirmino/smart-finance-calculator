"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";

import Nav from "@/app/components/ui/nav";
import AddTransaction from "@/app/components/add-transaction";

const Header = () => {
  const { data: session } = useSession();

  return (
    session && (
      <header className="bg-card flex h-fit w-full items-center justify-between rounded-2xl border p-2 shadow-sm md:max-w-md xl:max-w-fit xl:flex-col xl:justify-normal xl:gap-20">
        <Image
          src="/SFC Logo.png"
          alt="SFC: Smart Finance Calculator Logo"
          height={500}
          width={500}
          className="order-2 w-10 rounded-2xl xl:order-1 xl:w-14"
        />

        <div className="order-1 flex gap-5 xl:order-2 xl:flex-col">
          <Nav />
          <AddTransaction />
        </div>
      </header>
    )
  );
};

export default Header;
