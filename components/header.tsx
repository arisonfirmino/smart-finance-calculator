"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Header = () => {
  const handleSignOutClick = () => signOut();

  return (
    <header className="flex w-full items-center justify-between p-5">
      <div className="flex items-center gap-2.5">
        <Image
          src="/SFC logo.png"
          alt="FSC: Smart Finance Calculator logo"
          height={328}
          width={328}
          className="h-10 w-10"
        />
        <h1 className="hidden text-xl font-bold md:block">
          Smart Finance Calculator
        </h1>
      </div>
      <Button
        size="icon"
        onClick={handleSignOutClick}
        className="rounded-xl hover:bg-red-600"
      >
        <LogOutIcon />
      </Button>
    </header>
  );
};

export default Header;
