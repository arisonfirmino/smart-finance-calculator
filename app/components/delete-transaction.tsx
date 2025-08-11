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

import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

import { deleteTransaction } from "@/app/actions/transaction/delete";

import { toast } from "sonner";

import { Transaction } from "@/app/types";

const DeleteTransaction = ({
  transaction,
}: {
  transaction: Pick<Transaction, "id" | "type">;
}) => {
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
      deleteTransaction({
        userEmail: session.user.email,
        transactionId: transaction.id,
      }),
      {
        loading: `Apagando ${transaction.type === "income" ? "receita" : "despesa"}...`,
        success: `${transaction.type === "income" ? "Receita" : "Despesa"} excluida.`,
        error: (error) =>
          error.message ||
          `Não foi possível apagar sua ${transaction.type === "income" ? "receita" : "despesa"}. Tente novamente.`,
      },
    );

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="active:text-destructive hover:text-destructive text-foreground/80 font-medium">
        {isLoading ? (
          <LoaderCircleIcon className="animate-spin" />
        ) : (
          <Trash2Icon />
        )}
        {isLoading ? "Deletando" : "Deletar"}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deletar {transaction.type === "income" ? "Receita" : "Despesa"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação irá excluir permanentemente{" "}
            {transaction.type === "income" ? "essa receita" : "essa despesa"}.
            Essa operação não poderá ser desfeita.
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

export default DeleteTransaction;
