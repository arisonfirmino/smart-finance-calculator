"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  const handleSignOutClick = () => signOut();

  return (
    <Button
      onClick={handleSignOutClick}
      className="w-full justify-between border-none uppercase hover:bg-red-600"
    >
      Sair
      <LogOutIcon />
    </Button>
  );
};

export default SignOutButton;
