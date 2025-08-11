"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { cn } from "@/app/lib/utils";
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

import { ChevronRightIcon, LoaderCircleIcon } from "lucide-react";

import { deleteAllTransactions } from "@/app/actions/transaction/delete";

import { toast } from "sonner";

const DeleteTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) {
      toast.error("Você precisa estar logado para realizar essa ação.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    await toast.promise(
      deleteAllTransactions({ userEmail: session.user.email }),
      {
        loading: "Apagando suas transações...",
        success: "Seu histórico financeiro foi apagado.",
        error: (error) =>
          error.message ||
          "Não foi possível apagar as transações. Tente novamente.",
      },
    );

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className={cn("justify-between")}
      >
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {isLoading ? "Excluindo" : "Excluir"} transações
          </span>
          <span className="text-foreground/50 text-xs">
            {isLoading ? "Apagando" : "Apaga"} todo o histórico financeiro
          </span>
        </div>

        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <ChevronRightIcon />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir transações</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. Todas as transações serão
            permanentemente apagadas do histórico.
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

export default DeleteTransactions;
