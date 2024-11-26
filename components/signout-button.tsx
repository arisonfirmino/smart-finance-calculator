"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOutClick = () => signOut();

  return (
    <Button
      onClick={handleSignOutClick}
      className="w-full justify-between rounded-xl uppercase hover:bg-red-600"
    >
      Sair
      <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
