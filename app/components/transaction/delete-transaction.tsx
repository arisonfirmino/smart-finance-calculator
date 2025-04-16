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

import { EllipsisIcon, LoaderCircleIcon } from "lucide-react";

import { deleteTransaction } from "@/app/actions/transaction";

import { Transaction } from "@prisma/client";

interface DeleteTransactionProps {
  transaction: Pick<Transaction, "id" | "type">;
}

const DeleteTransaction = ({ transaction }: DeleteTransactionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) return;

    setIsLoading(true);

    await deleteTransaction({
      userId: session.user.id,
      transactionId: transaction.id,
    });

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className="text-foreground/50 hover:text-foreground absolute top-5 right-5 cursor-pointer"
      >
        {isLoading ? (
          <LoaderCircleIcon size={14} />
        ) : (
          <EllipsisIcon size={14} />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir transação</AlertDialogTitle>
          <AlertDialogDescription>
            Essa operação removerá definitivamente esta{" "}
            {transaction.type === "income" ? "receita" : "despesa"} e
            recalculará os saldos associados. Deseja prosseguir?
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
