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

import { LoaderIcon, Trash2Icon } from "lucide-react";

import { deleteTransaction } from "@/app/actions/transaction/delete";

import { toast } from "sonner";

import { Transaction } from "@prisma/client";

interface DeleteTransactionProps {
  transaction: Pick<Transaction, "id" | "type">;
}

const DeleteTransaction = ({ transaction }: DeleteTransactionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDelete = async () => {
    if (!session) {
      toast("Usuário não autenticado.");
      return;
    }

    setIsLoading(true);

    await toast.promise(
      deleteTransaction({
        userId: session.user.id,
        transactionId: transaction.id,
      }),
      {
        loading: `Removendo ${transaction.type === "income" ? "receita" : "despesa"}...`,
        success: `${transaction.type === "income" ? "Receita" : "Despesa"} removida com sucesso.`,
        error: (err) =>
          err?.error ||
          `Erro ao remover a ${transaction.type === "income" ? "receita" : "despesa"}.`,
      },
    );

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className="hover:text-foreground/50 absolute top-5 right-2.5 cursor-pointer text-red-600"
      >
        {isLoading ? (
          <LoaderIcon size={12} className="animate-spin" />
        ) : (
          <Trash2Icon size={12} />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir transação</AlertDialogTitle>

          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso removerá permanentemente a{" "}
            {transaction.type === "income" ? "receita" : "despesa"} do seu
            histórico.
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
