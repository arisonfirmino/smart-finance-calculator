"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogInIcon } from "lucide-react";

const SignInPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Button onClick={async () => await signIn("google")} variant="outline">
        <LogInIcon />
        Fazer Login
      </Button>
    </main>
  );
};

export default SignInPage;
