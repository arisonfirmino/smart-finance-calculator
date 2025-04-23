"use client";

import { signOut } from "next-auth/react";

import { Logout01Icon } from "hugeicons-react";

const SignOutButton = () => {
  return (
    <button
      onClick={async () => await signOut()}
      className="active:text-foreground/50 hover:text-foreground/50 dark:active:text-foreground/50 dark:hover:text-foreground/50 flex cursor-pointer items-center justify-between text-sm font-medium text-red-600 dark:text-red-400"
    >
      Desconectar
      <Logout01Icon size={16} />
    </button>
  );
};

export default SignOutButton;
