"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";

import { Delete02Icon, RefreshIcon } from "hugeicons-react";

import { deleteBank } from "@/app/actions/bank";

const DeleteBank = ({ bankId }: { bankId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) return;

    setIsLoading(true);

    await deleteBank({ userId: session.user.id, bankId });

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className="hover:text-foreground/50 active:text-foreground/50 cursor-pointer text-red-600"
      >
        {isLoading ? (
          <RefreshIcon size={12} className="animate-spin" />
        ) : (
          <Delete02Icon size={12} />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir banco</AlertDialogTitle>
          <AlertDialogDescription>
            Essa operação removerá definitivamente este banco e todas as
            transações associados. Deseja prosseguir?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBank;
