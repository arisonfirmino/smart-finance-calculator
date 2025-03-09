"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import GoogleIcon from "@/app/constants/google-icon";

const SignInPage = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-4/5 flex-col items-center md:max-w-xs md:items-start">
        <div className="bg-primary text-primary-foreground w-fit rounded-t-2xl px-2.5 py-2">
          <p className="text-xs">© 2025 Arison. All Rights Reserved</p>
        </div>

        <div className="bg-card w-full space-y-2.5 rounded-2xl border p-2.5 shadow-sm md:rounded-tl-none">
          <h1 className="poppins text-center text-lg font-semibold">
            SFC: Smart Finance Calculator
          </h1>

          <Button
            onClick={async () => await signIn("google")}
            variant="outline"
            className="w-full"
          >
            <GoogleIcon />
            Continuar com Google
          </Button>

          <p className="text-muted-foreground text-center text-xs">
            Entre com sua conta do Google e comece a gerenciar suas finanças
            agora mesmo!
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInPage;
