"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import Copyright from "@/app/components/copyright";

import { signIn } from "next-auth/react";

const SignIn = () => {
  const handleSignInClick = async () => await signIn("google");

  return (
    <Dialog open={true}>
      <DialogContent className="top-0 -translate-y-0 gap-2.5 rounded-3xl p-5 md:top-1/2 md:-translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Faça login para continuar</DialogTitle>
          <DialogDescription>
            Usamos sua conta do Google apenas para autenticação. Não acessamos
            seus dados pessoais.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="space-y-1.5">
          <Button
            onClick={handleSignInClick}
            variant="outline"
            className="w-full"
          >
            <GoogleIcon />
            Continuar com o Google
          </Button>

          <Copyright />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const GoogleIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.537 6.69437H14V6.66671H8V9.33337H11.7677C11.218 10.8857 9.741 12 8 12C5.791 12 3.99999 10.209 3.99999 8.00004C3.99999 5.79104 5.791 4.00004 8 4.00004C9.01966 4.00004 9.94733 4.38471 10.6537 5.01304L12.5393 3.12737C11.3487 2.01771 9.756 1.33337 8 1.33337C4.31833 1.33337 1.33333 4.31837 1.33333 8.00004C1.33333 11.6817 4.31833 14.6667 8 14.6667C11.6817 14.6667 14.6667 11.6817 14.6667 8.00004C14.6667 7.55304 14.6207 7.11671 14.537 6.69437Z"
        fill="#FFC107"
      />
      <path
        d="M2.102 4.89704L4.29233 6.50337C4.885 5.03604 6.32033 4.00004 8 4.00004C9.01966 4.00004 9.94733 4.38471 10.6537 5.01304L12.5393 3.12737C11.3487 2.01771 9.756 1.33337 8 1.33337C5.43933 1.33337 3.21866 2.77904 2.102 4.89704Z"
        fill="#FF3D00"
      />
      <path
        d="M8 14.6667C9.722 14.6667 11.2867 14.0077 12.4697 12.936L10.4063 11.19C9.71463 11.7163 8.8692 12.0009 8 12C6.266 12 4.79367 10.8943 4.239 9.35132L2.065 11.0263C3.16834 13.1853 5.409 14.6667 8 14.6667Z"
        fill="#4CAF50"
      />
      <path
        d="M14.537 6.69429H14V6.66663H8V9.33329H11.7677C11.5047 10.0721 11.0311 10.7177 10.4053 11.1903L10.4063 11.1896L12.4697 12.9356C12.3237 13.0683 14.6667 11.3333 14.6667 7.99996C14.6667 7.55296 14.6207 7.11663 14.537 6.69429Z"
        fill="#1976D2"
      />
    </svg>
  );
};

export default SignIn;
