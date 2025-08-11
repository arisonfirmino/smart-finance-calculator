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

import { deleteAllBanks } from "@/app/actions/bank/delete";

import { toast } from "sonner";

const DeleteBanks = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) {
      toast.error("Você precisa estar logado para realizar essa ação.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    await toast.promise(deleteAllBanks({ userEmail: session.user.email }), {
      loading: "Apagando seus bancos...",
      success: "Seu histórico financeiro foi apagado.",
      error: (error) =>
        error.message || "Não foi possível apagar os bancos. Tente novamente.",
    });

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn("justify-between")}>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {isLoading ? "Excluindo" : "Excluir"} bancos
          </span>
          <span className="text-foreground/50 text-xs">
            {isLoading ? "Removendo" : "Remove"} todos os bancos cadastrados
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
          <AlertDialogTitle>Excluir bancos</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não poderá ser desfeita. Todos os bancos serão
            permanentemente removidos da sua conta.
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

export default DeleteBanks;
