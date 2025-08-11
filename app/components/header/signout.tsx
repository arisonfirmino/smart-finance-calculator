"use client";

import { signOut } from "next-auth/react";

import { LogOutIcon } from "lucide-react";

const SignOut = () => {
  const handleSignOutClick = async () => await signOut();

  return (
    <div className="flex flex-col gap-3 p-5">
      <span className="text-foreground/50 text-xs font-medium">Login</span>

      <button
        onClick={handleSignOutClick}
        className="hover:text-foreground/50 text-destructive active:text-foreground/50 flex cursor-pointer items-center justify-between text-sm font-medium"
      >
        Desconectar <LogOutIcon size={16} />
      </button>
    </div>
  );
};

export default SignOut;
