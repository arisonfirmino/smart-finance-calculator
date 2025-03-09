"use client";

import { signOut } from "next-auth/react";

import { LogOutIcon } from "lucide-react";

const LogOutButton = () => {
  return (
    <button
      onClick={async () => await signOut()}
      className="cursor-pointer text-white hover:text-red-600"
    >
      <LogOutIcon size={16} />
    </button>
  );
};

export default LogOutButton;
